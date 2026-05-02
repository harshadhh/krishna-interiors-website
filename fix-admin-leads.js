import fs from 'fs';

let content = fs.readFileSync('src/pages/Admin.tsx', 'utf8');
content = content.replace(
  'Lock, KeyRound } from "lucide-react";',
  'Lock, KeyRound, MessageCircle, Inbox } from "lucide-react";'
);

content = content.replace(
  "const [activeTab, setActiveTab] = useState<'base' | 'catalogue' | 'portfolio' | 'settings' | 'setup'>('base');",
  "const [activeTab, setActiveTab] = useState<'base' | 'catalogue' | 'portfolio' | 'settings' | 'setup' | 'leads'>('base');"
);

content = content.replace(
  "{ id: 'settings', icon: <KeyRound size={16} />, label: 'Security' }",
  "{ id: 'leads', icon: <Inbox size={16} />, label: 'Leads Inbox' },\n              { id: 'settings', icon: <KeyRound size={16} />, label: 'Security' }"
);

// Add the Leads component right before Settings TAB
const tabSettingsIdx = content.indexOf("{/* TAB: SETTINGS */}");
if (tabSettingsIdx !== -1) {
  const leadsTabCode = `
            {/* TAB: LEADS */}
            {activeTab === 'leads' && <LeadsDashboard />}
            
`;
  content = content.substring(0, tabSettingsIdx) + leadsTabCode + content.substring(tabSettingsIdx);
}

// Now insert LeadsDashboard component before Admin function
const adminFuncIdx = content.indexOf("export function Admin() {");
if (adminFuncIdx !== -1) {
  const leadsCompCode = `
  const LeadsDashboard = () => {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      import("firebase/firestore").then(({ collection, query, orderBy, onSnapshot }) => {
        import("../lib/firebase").then(({ db }) => {
          const q = query(collection(db, "contact_submissions"), orderBy("timestamp", "desc"));
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const data: any[] = [];
            snapshot.forEach((doc) => {
              data.push({ id: doc.id, ...doc.data() });
            });
            setLeads(data);
            setLoading(false);
          });
          return () => unsubscribe();
        });
      });
    }, []);

    if (loading) return <div className="text-forest">Loading leads...</div>;

    if (leads.length === 0) return (
      <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
        <Inbox size={48} className="mx-auto text-forest/20 mb-4" />
        <h3 className="text-forest text-xl font-display uppercase tracking-widest font-bold">No Leads Yet</h3>
        <p className="text-forest/60 text-sm mt-2">When someone submits their vision on the contact page, it will appear here.</p>
      </div>
    );

    return (
      <div className="space-y-6">
        <h2 className="font-display text-2xl uppercase tracking-widest text-terracotta border-l-4 border-terracotta pl-4 flex items-center gap-3">
          Incoming Leads
          <span className="bg-forest text-ivory text-xs px-2.5 py-1 rounded-full">{leads.length}</span>
        </h2>
        
        <div className="grid gap-6">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white p-6 rounded-2xl shadow-sm border border-forest/10 relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-forest">{lead.name}</h3>
                  <div className="flex gap-4 text-xs font-display uppercase tracking-widest text-forest/60 mt-1">
                    <a href={"tel:" + lead.phone} className="hover:text-terracotta">{lead.phone}</a>
                    <span>|</span>
                    <a href={"mailto:" + lead.email} className="hover:text-terracotta">{lead.email}</a>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-forest/5 text-forest text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm border border-forest/10 block mb-2">
                    {lead.service}
                  </span>
                  <span className="text-terracotta font-serif font-bold italic text-lg">
                    {lead.budget}
                  </span>
                </div>
              </div>

              <div className="bg-forest/5 p-4 rounded-xl mb-4 border border-forest/5">
                <span className="text-forest/40 uppercase tracking-widest text-[10px] font-bold block mb-1">Project Details</span>
                <p className="text-forest font-serif italic line-clamp-4">{lead.details}</p>
              </div>

              <div className="flex justify-between items-center text-xs text-forest/40 uppercase font-display tracking-widest">
                <span>Area: <strong className="text-forest/70">{lead.area}</strong></span>
                <span>{lead.timestamp ? new Date(lead.timestamp.seconds * 1000).toLocaleString() : 'Just now'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
`;
  content = content.substring(0, adminFuncIdx) + leadsCompCode + content.substring(adminFuncIdx);
}

fs.writeFileSync('src/pages/Admin.tsx', content);
console.log("Admin updated with Leads tool!");
