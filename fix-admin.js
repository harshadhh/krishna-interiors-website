import fs from 'fs';

let content = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

// The starting line of GridImageUploader
const gridImageUploaderStart = content.indexOf('  // Compact Image Uploader for Grid');
// The ending line of NewProjectForm inside Admin
const newProjectFormEnd = content.indexOf('  if (isInitializing) {');

if (gridImageUploaderStart !== -1 && newProjectFormEnd !== -1) {
  const extracted = content.substring(gridImageUploaderStart, newProjectFormEnd);
  
  // replace inside Admin
  content = content.replace(extracted, '');
  
  // Place extracted at the top after imports and helpers
  const adminFunctionStart = content.indexOf('export function Admin() {');
  
  content = content.substring(0, adminFunctionStart) + 
    `\n// === EXTRACTED COMPONENTS ===\n` +
    `  // Compact Image Uploader for Grid
  const GridImageUploader = ({ 
    label, 
    currentImage, 
    onUpdate,
    onRemove,
    handleFileUpload,
    showToast
  }: { 
    key?: string | number;
    label: string, 
    currentImage: string, 
    onUpdate: (url: string) => void,
    onRemove?: () => void,
    handleFileUpload: any,
    showToast: any
  }) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [editUrl, setEditUrl] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    return (
      <div className="bg-white p-4 rounded-xl border border-forest/10 shadow-sm flex flex-col group relative hover:border-terracotta transition-colors">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-display uppercase tracking-widest text-[10px] sm:text-xs font-semibold text-forest truncate pr-2">
            {label}
          </h3>
          {(onRemove || onUpdate) && currentImage && (
            <button onClick={() => onRemove ? onRemove() : onUpdate("")} type="button" className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors" title="Remove Image">
              <Trash2 size={14} />
            </button>
          )}
        </div>
        
        <div className="w-full aspect-square rounded-lg overflow-hidden bg-forest/5 relative flex items-center justify-center group-hover:shadow-inner transition-all mb-4">
          {isUploading ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-forest/10 backdrop-blur-sm z-20">
               <div className="w-6 h-6 border-2 border-terracotta border-t-transparent rounded-full animate-spin mb-2"></div>
               <span className="text-forest text-[10px] uppercase tracking-widest font-display font-semibold">Uploading...</span>
             </div>
          ) : currentImage ? (
            <img src={currentImage} alt={label} className="w-full h-full object-cover" />
          ) : (
             <span className="text-forest/30 text-xs uppercase font-display font-bold flex flex-col items-center gap-2">
               <ImageIcon size={24} />
               No Image
             </span>
          )}
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm z-10">
            <button 
              type="button"
              onClick={() => fileRef.current?.click()}
              className="bg-ivory text-forest text-xs font-display uppercase tracking-widest px-4 py-2 rounded flex items-center gap-2 hover:bg-terracotta hover:text-ivory transition-colors"
            >
              <Upload size={14} /> Upload
            </button>
            <button 
              type="button"
              onClick={() => setEditUrl(!editUrl)}
              className="text-ivory text-[10px] font-display uppercase tracking-widest underline underline-offset-2 hover:text-terracotta transition-colors"
            >
              Or specify URL
            </button>
          </div>
        </div>

        <input 
          type="file" accept="image/*" className="hidden" ref={fileRef}
          onChange={(e) => handleFileUpload(e, onUpdate, setIsUploading)}
        />

        {editUrl && (
          <div className="animate-in fade-in slide-in-from-top-2">
            <input 
              type="text" 
              placeholder="Paste Image URL"
              defaultValue={currentImage} 
              onBlur={(e) => {
                if(e.target.value !== currentImage) {
                  onUpdate(e.target.value);
                  showToast("Image updated via URL.");
                }
                setEditUrl(false);
              }}
              onKeyDown={(e) => {
                if(e.key === 'Enter') e.currentTarget.blur();
              }}
              className="w-full px-3 py-2 bg-forest/5 border border-forest/20 rounded focus:outline-none focus:border-terracotta text-xs font-sans"
              autoFocus
            />
          </div>
        )}
      </div>
    );
  };

  const ProjectEditorCard = ({ item, portfolioIndex, handleFileUpload, showToast, useSiteDataHook }: { item: any, portfolioIndex: number, handleFileUpload: any, showToast: any, useSiteDataHook: any }) => {
    const { updatePortfolioProjectDetails, deletePortfolioProject, addPortfolioImage, removePortfolioImage, updatePortfolioItem } = useSiteDataHook();
    const [title, setTitle] = useState(item.title);
    const [location, setLocation] = useState(item.location);
    const [color, setColor] = useState(item.color);

    // Sync from props if they change
    useEffect(() => {
        setTitle(item.title);
        setLocation(item.location);
        setColor(item.color);
    }, [item]);

    const handleSave = () => {
      updatePortfolioProjectDetails(portfolioIndex, { title, location, color });
      showToast("Project details saved.");
    };

    return (
      <div key={item.id} className="bg-white p-8 rounded-3xl border border-forest/10 shadow-sm relative group">
        <button 
          onClick={() => {
            if(confirm('Are you sure you want to delete ' + item.title + '?')) {
              deletePortfolioProject(portfolioIndex);
              showToast("Project deleted.");
            }
          }}
          className="absolute top-8 right-8 text-red-500 bg-red-50 hover:bg-red-600 hover:text-white p-3 rounded-full transition-colors z-10 shadow-sm"
          title="Delete Entire Project"
        >
          <Trash2 size={20} />
        </button>
        
        <div className="flex items-start md:items-center gap-6 mb-10 flex-col md:flex-row pr-16 bg-forest/5 p-6 rounded-2xl border border-forest/5">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full flex-shrink-0 border-4 border-white shadow-md relative overflow-hidden" style={{ backgroundColor: color }}>
              <input 
                type="color" 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className="absolute inset-[-10px] w-24 h-24 cursor-pointer opacity-0"
                title="Change Brand Color"
              />
            </div>
            <span className="text-forest text-[10px] uppercase font-display tracking-widest font-semibold">Color</span>
          </div>
          <div className="flex-1 w-full">
            <input 
              className="font-display text-3xl md:text-4xl uppercase tracking-wider text-forest font-bold leading-none mb-2 w-full bg-transparent border-b border-transparent hover:border-forest/20 focus:border-terracotta focus:outline-none transition-colors py-1"
              value={title}
              placeholder="Project Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <input 
                className="font-serif italic text-forest/60 text-lg sm:w-64 bg-transparent border-b border-transparent hover:border-forest/20 focus:border-terracotta focus:outline-none transition-colors py-1"
                value={location}
                placeholder="Location / Sub Title"
                onChange={(e) => setLocation(e.target.value)}
              />
              <span className="text-forest/40 text-sm hidden sm:inline-block">| Project #{item.id}</span>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                  type="button"
                  onClick={handleSave}
                  className="bg-forest text-ivory text-xs uppercase font-display tracking-widest px-6 py-2 rounded shadow hover:bg-forest/90 transition-colors"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h4 className="font-display uppercase text-sm tracking-widest text-forest font-semibold border-l-2 border-terracotta pl-3">
            Project Gallery
          </h4>
          <button 
            type="button"
            onClick={() => {
              if (!item.images || item.images.length < 5) {
                addPortfolioImage(portfolioIndex, "");
              } else {
                alert("Maximum of 5 images allowed per portfolio project.");
              }
            }}
            className={'flex items-center gap-2 text-xs font-display uppercase tracking-widest px-5 py-2.5 rounded-full transition-colors font-semibold ' + (item.images && item.images.length >= 5 ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed' : 'text-terracotta border border-terracotta/30 hover:bg-terracotta hover:text-ivory')}
            disabled={item.images && item.images.length >= 5}
          >
            <Plus size={14} /> Add Image
          </button>
        </div>

        {(!item.images || item.images.length === 0) ? (
          <div className="text-center py-16 bg-forest/5 rounded-2xl border-2 border-dashed border-forest/10 text-forest/40 text-sm font-sans flex flex-col items-center gap-4">
             <ImageIcon size={32} className="opacity-30" />
             <p>No images in this gallery.</p>
             <button type="button" onClick={() => {
               if (!item.images || item.images.length < 5) {
                 addPortfolioImage(portfolioIndex, "");
               }
             }} className="text-terracotta underline uppercase font-display tracking-widest text-[10px]">Add First Image</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {item.images.map((imgUrl: string, imageIndex: number) => (
              <GridImageUploader 
                key={imageIndex}
                label={imageIndex === 0 ? "Cover (Featured)" : 'Gallery Img ' + (imageIndex + 1)} 
                currentImage={imgUrl} 
                onUpdate={(url: string) => updatePortfolioItem(portfolioIndex, imageIndex, url)}
                onRemove={() => removePortfolioImage(portfolioIndex, imageIndex)}
                handleFileUpload={handleFileUpload}
                showToast={showToast}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const NewProjectForm = ({ showToast, useSiteDataHook }: any) => {
    const { addPortfolioProject } = useSiteDataHook();
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [color, setColor] = useState("#1d2524");

    const handleCreate = (e: React.FormEvent) => {
      e.preventDefault();
      if (!title) return;
      addPortfolioProject({ title, location, color, images: [] });
      showToast("New project created.");
      setTitle("");
      setLocation("");
      setColor("#1d2524");
    };

    return (
      <form onSubmit={handleCreate} className="bg-forest/5 p-6 md:p-8 rounded-2xl border border-forest/10 flex flex-col md:flex-row gap-6 items-end">
        <div className="flex-1 w-full relative">
          <label className="block text-[10px] uppercase tracking-widest text-forest/60 mb-2 font-display">New Project Title *</label>
          <input type="text" value={title} onChange={e=>setTitle(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-forest/20 text-sm focus:border-terracotta focus:outline-none transition-colors" placeholder="e.g. The Glass Villa" />
        </div>
        <div className="flex-1 w-full relative">
          <label className="block text-[10px] uppercase tracking-widest text-forest/60 mb-2 font-display">Location</label>
          <input type="text" value={location} onChange={e=>setLocation(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-forest/20 text-sm focus:border-terracotta focus:outline-none transition-colors" placeholder="e.g. Pune" />
        </div>
        <div className="w-full md:w-32 relative">
          <label className="block text-[10px] uppercase tracking-widest text-forest/60 mb-2 font-display">Brand Color</label>
          <div className="relative">
            <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-full h-11 rounded-lg border-2 border-forest/20 cursor-pointer p-0.5" />
          </div>
        </div>
        <button type="submit" className="bg-terracotta text-ivory px-8 py-3 rounded-lg uppercase font-display tracking-widest text-sm font-semibold hover:bg-forest transition-colors whitespace-nowrap h-11">
          Add Project
        </button>
      </form>
    );
  };
// ==========================\n\n` + content.substring(adminFunctionStart);

  // replace usages
  content = content.replace(/<ProjectEditorCard key=\{item.id\} item=\{item\} portfolioIndex=\{portfolioIndex\} \/>/g, '<ProjectEditorCard key={item.id} item={item} portfolioIndex={portfolioIndex} showToast={showToast} handleFileUpload={handleFileUpload} useSiteDataHook={useSiteData} />');
  content = content.replace(/<NewProjectForm \/>/g, '<NewProjectForm showToast={showToast} useSiteDataHook={useSiteData} />');
  
  // replace GridImageUploader usages to pass handleFileUpload and showToast
  content = content.replace(/<GridImageUploader \n                              key=\{subIndex\}\n                              label/g, '<GridImageUploader \n                              key={subIndex}\n                              handleFileUpload={handleFileUpload}\n                              showToast={showToast}\n                              label');

  content = content.replace(/<GridImageUploader \n                          label="Cover Image"/g, '<GridImageUploader \n                          handleFileUpload={handleFileUpload}\n                          showToast={showToast}\n                          label="Cover Image"');


  fs.writeFileSync('src/pages/Admin.tsx', content);
  console.log('Fixed Admin.tsx successfully');
} else {
  console.log('Could not find start/end marks');
}
