import fs from 'fs';

let content = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

// Reverse imports
content = content.replace(
  'Lock, KeyRound, MessageCircle, Inbox } from "lucide-react";',
  'Lock, KeyRound } from "lucide-react";'
);

// Reverse activeTab State
content = content.replace(
  "const [activeTab, setActiveTab] = useState<'base' | 'catalogue' | 'portfolio' | 'settings' | 'setup' | 'leads'>('base');",
  "const [activeTab, setActiveTab] = useState<'base' | 'catalogue' | 'portfolio' | 'settings' | 'setup'>('base');"
);

// Reverse tabs array
content = content.replace(
  "{ id: 'leads', icon: <Inbox size={16} />, label: 'Leads Inbox' },\n              { id: 'settings', icon: <KeyRound size={16} />, label: 'Security' }",
  "{ id: 'settings', icon: <KeyRound size={16} />, label: 'Security' }"
);

// Remove the Leads TAB render code
const leadsTabStart = content.indexOf("{/* TAB: LEADS */}");
if (leadsTabStart !== -1) {
  const tabSettingsIdx = content.indexOf("{/* TAB: SETTINGS */}");
  if (tabSettingsIdx !== -1) {
    content = content.substring(0, leadsTabStart) + content.substring(tabSettingsIdx);
  }
}

// Remove LeadsDashboard component
const leadsDashStart = content.indexOf("const LeadsDashboard = () => {");
if (leadsDashStart !== -1) {
  const adminFuncIdx = content.indexOf("export function Admin() {");
  if (adminFuncIdx !== -1) {
    content = content.substring(0, leadsDashStart) + content.substring(adminFuncIdx);
  }
}

fs.writeFileSync('src/pages/Admin.tsx', content);
console.log("Undid Admin Leads changes!");
