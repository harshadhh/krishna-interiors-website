import React, { useState, useRef, useEffect } from "react";
import { useSiteData } from "../contexts/SiteDataContext";
import { Upload, X, Save, AlertCircle, Plus, Trash2, Camera, Layers, Settings, Image as ImageIcon, Lock, KeyRound } from "lucide-react";
import { PageTransition } from "../components/PageTransition";

// Helper to hash password
const hashPassword = async (password: string) => {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};


// === EXTRACTED COMPONENTS ===
  // Compact Text Input with Save Button
  const AdminTextInput = ({ label, value, onSave }: { label: string, value: string, onSave: (val: string) => void }) => {
    const [currentValue, setCurrentValue] = useState(value);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
      setCurrentValue(value);
    }, [value]);

    return (
      <div className="bg-white p-4 rounded-xl border border-forest/10 shadow-sm flex flex-col justify-center">
        <h3 className="font-display uppercase tracking-widest text-[10px] sm:text-xs font-semibold text-forest truncate mb-3">{label}</h3>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={currentValue} 
            onChange={(e) => {
              setCurrentValue(e.target.value);
              setIsSaved(false);
            }} 
            className="w-full px-3 py-2 bg-forest/5 border border-forest/20 rounded focus:outline-none focus:border-terracotta text-xs font-sans" 
          />
          <button 
            onClick={() => {
              onSave(currentValue);
              setIsSaved(true);
              setTimeout(() => setIsSaved(false), 2000);
            }}
            className="bg-forest text-ivory px-3 py-2 rounded text-xs font-semibold hover:bg-forest/80 transition-colors shrink-0"
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    );
  };

  // Compact Image Uploader for Grid
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
    const [showConfirm, setShowConfirm] = useState(false);

    return (
      <div className="bg-white p-4 rounded-xl border border-forest/10 shadow-sm flex flex-col group relative hover:border-terracotta transition-colors">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-display uppercase tracking-widest text-[10px] sm:text-xs font-semibold text-forest truncate pr-2">
            {label}
          </h3>
          {(onRemove || onUpdate) && currentImage && (
            <div className="flex items-center shrink-0 ml-2">
              {showConfirm ? (
                <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded">
                  <span className="text-[10px] uppercase font-display font-semibold text-red-600 mr-1">Delete?</span>
                  <button onClick={() => { setShowConfirm(false); onRemove ? onRemove() : onUpdate(""); }} className="bg-red-500 text-white px-2 py-0.5 rounded text-[10px] hover:bg-red-600">Yes</button>
                  <button onClick={() => setShowConfirm(false)} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-[10px] hover:bg-gray-300">No</button>
                </div>
              ) : (
                <button onClick={() => setShowConfirm(true)} type="button" className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors" title="Remove Image">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
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

  const ProjectEditorCard = ({ item, portfolioIndex, handleFileUpload, showToast, useSiteDataHook }: any) => {
    const { updatePortfolioProjectDetails, deletePortfolioProject, addPortfolioImage, removePortfolioImage, updatePortfolioItem } = useSiteDataHook();
    const [title, setTitle] = useState(item.title);
    const [location, setLocation] = useState(item.location);
    const [color, setColor] = useState(item.color);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    const [isSaving, setIsSaving] = useState(false);

    // Sync from props if they change
    useEffect(() => {
        setTitle(item.title);
        setLocation(item.location);
        setColor(item.color);
    }, [item]);

    const handleSave = async () => {
      setIsSaving(true);
      try {
        await updatePortfolioProjectDetails(portfolioIndex, { title, location, color });
        showToast("Project details saved.");
      } catch (err: any) {
        showToast("Error saving: " + err.message);
      } finally {
        setIsSaving(false);
      }
    };

    return (
      <div key={item.id} className="bg-white p-8 rounded-3xl border border-forest/10 shadow-sm relative group">
        <div className="absolute top-8 right-8 z-20 flex flex-col items-end gap-2">
          {showConfirmDelete ? (
            <div className="bg-white shadow-xl border border-red-200 p-3 rounded-xl flex items-center gap-3 w-max">
              <span className="text-xs uppercase font-display font-bold text-red-600">Delete Project?</span>
              <button 
                onClick={() => {
                  deletePortfolioProject(portfolioIndex);
                  showToast("Project deleted.");
                }}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors"
              >
                Yes
              </button>
              <button 
                onClick={() => setShowConfirmDelete(false)}
                className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors"
              >
                No
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowConfirmDelete(true)}
              className="text-red-500 bg-red-50 hover:bg-red-600 hover:text-white p-3 rounded-full transition-colors shadow-sm"
              title="Delete Entire Project"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
        
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
              onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
            />
            <div className="flex items-center gap-2">
              <input 
                className="font-serif italic text-forest/60 text-lg sm:w-64 bg-transparent border-b border-transparent hover:border-forest/20 focus:border-terracotta focus:outline-none transition-colors py-1"
                value={location}
                placeholder="Location / Sub Title"
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
              />
              <span className="text-forest/40 text-sm hidden sm:inline-block">| Project #{item.id}</span>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-forest text-ivory text-xs uppercase font-display tracking-widest px-6 py-2 rounded shadow hover:bg-forest/90 transition-colors disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Details"}
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
// ==========================


  export function Admin() {
  const { 
    data, updateData, 
    updatePortfolioItem, updatePortfolioProjectDetails, addPortfolioProject, deletePortfolioProject, addPortfolioImage, removePortfolioImage,
    updateCatalogueCover, addCatalogueSubItemImage, removeCatalogueSubItemImage 
  } = useSiteData();
  
  const [toast, setToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'base' | 'catalogue' | 'portfolio' | 'settings' | 'setup'>('base');
  
  // Auth State
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginInput, setLoginInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Settings State
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [settingsError, setSettingsError] = useState("");
  const [settingsSuccess, setSettingsSuccess] = useState("");
  
  const [showConfirmRestore, setShowConfirmRestore] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedHash = localStorage.getItem("studio-admin-hash");
      if (!storedHash) {
        // Set default password "studio2026"
        const defaultHash = await hashPassword("studio2026");
        localStorage.setItem("studio-admin-hash", defaultHash);
      }
      setIsInitializing(false);
    };
    initializeAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const storedHash = localStorage.getItem("studio-admin-hash");
    const inputHash = await hashPassword(loginInput);
    if (inputHash === storedHash) {
      setIsAuthenticated(true);
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError("");
    setSettingsSuccess("");
    
    if (newPasswordInput !== confirmPasswordInput) {
      setSettingsError("New passwords do not match.");
      return;
    }
    if (newPasswordInput.length < 6) {
      setSettingsError("New password must be at least 6 characters.");
      return;
    }

    const storedHash = localStorage.getItem("studio-admin-hash");
    const currentInputHash = await hashPassword(currentPasswordInput);
    
    if (currentInputHash !== storedHash) {
      setSettingsError("Current password is incorrect.");
      return;
    }

    const newHash = await hashPassword(newPasswordInput);
    localStorage.setItem("studio-admin-hash", newHash);
    setSettingsSuccess("Password updated successfully.");
    setCurrentPasswordInput("");
    setNewPasswordInput("");
    setConfirmPasswordInput("");
    showToast("Admin password changed.");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginInput("");
    setActiveTab('base');
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dgo738djk";
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "krishna-interiors";

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary credentials are not configured in .env");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await res.json();
    return data.secure_url;
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (dataUrl: string) => void,
    setUploading?: (u: boolean) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dgo738djk") || !(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "krishna-interiors")) {
      alert("⚠️ Cloudinary is not configured in .env!\n\nFalling back to local storage (max 2MB), which may break if you upload too many images. Please check the Setup Guide tab.");
      
      if (file.size > 2 * 1024 * 1024) {
        alert("File is too large for LocalStorage. Please choose an image under 2MB or configure Cloudinary.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onComplete(event.target.result as string);
          showToast("Local Storage: Image updated!");
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    try {
      if (setUploading) setUploading(true);
      showToast("Uploading to Cloudinary... please wait.");
      const url = await uploadToCloudinary(file);
      onComplete(url);
      showToast("✅ Image uploaded to Cloudinary successfully!");
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      alert(`Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      if (setUploading) setUploading(false);
      if (e.target) e.target.value = ''; // Reset input
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#EFECE6] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-forest border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <PageTransition>
        <div className="bg-[#EFECE6] min-h-screen pt-32 pb-24 px-4 flex items-center justify-center">
          <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-forest/10 relative overflow-hidden">
             <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-forest to-terracotta"></div>
             <div className="w-16 h-16 bg-forest/5 rounded-full flex items-center justify-center text-forest mb-8 mx-auto">
               <Lock size={28} />
             </div>
             <h2 className="font-display text-2xl uppercase tracking-widest font-bold text-center text-forest mb-2">Admin Portal</h2>
             <p className="text-center font-sans text-forest/60 text-sm mb-8">Please enter the master password to access the control center.</p>
             
             <form onSubmit={handleLogin} className="flex flex-col gap-6">
               <div>
                  <input 
                    type="password" 
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="Enter Master Password"
                    className="w-full px-5 py-4 bg-forest/5 border border-forest/20 rounded-xl focus:outline-none focus:border-terracotta text-forest placeholder:text-forest/30 font-sans tracking-widest transition-colors"
                  />
                  {loginError && <p className="text-red-500 text-xs mt-2 font-sans px-2">{loginError}</p>}
               </div>
               <button type="submit" className="w-full bg-forest text-ivory py-4 rounded-xl uppercase font-display tracking-widest text-sm font-bold hover:bg-terracotta transition-colors">
                 Unlock Dashboard
               </button>
             </form>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="bg-[#EFECE6] min-h-screen pt-32 pb-24 px-4 md:px-8 relative">
        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-forest text-ivory px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-[200] animate-in slide-in-from-bottom-8 fade-in duration-300">
            <Save size={16} className="text-terracotta" />
            <span className="font-display uppercase tracking-widest text-xs font-semibold">{toast}</span>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          
          <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-forest mb-2 flex items-center gap-3">
                <Settings className="text-terracotta w-8 h-8" /> Control Center
              </h1>
              <p className="font-serif italic text-forest/70 flex items-center gap-2 text-lg">
                <AlertCircle size={16} className="text-terracotta" />
                Data is saved securely to the cloud.
              </p>
            </div>
            <button onClick={handleLogout} className="bg-white border border-forest/10 hover:border-forest/30 text-forest px-6 py-3 rounded-full font-display uppercase tracking-widest text-xs font-semibold flex items-center gap-2 transition-colors self-start md:self-auto shadow-sm">
              <Lock size={14} /> Lock Panel
            </button>
          </div>

          {/* Custom Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 border-b border-forest/10 pb-6">
            {[
              { id: 'base', icon: <Layers size={16} />, label: 'Structure & Base' },
              { id: 'catalogue', icon: <Camera size={16} />, label: 'Service Blueprints' },
              { id: 'portfolio', icon: <ImageIcon size={16} />, label: 'Masterpieces' },
              { id: 'setup', icon: <Layers size={16} />, label: 'Setup Guide' },
              { id: 'settings', icon: <KeyRound size={16} />, label: 'Security' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)} 
                className={`flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-display uppercase tracking-widest text-[10px] sm:text-xs font-semibold transition-all shadow-sm ${activeTab === tab.id ? 'bg-forest text-ivory scale-100' : 'bg-white text-forest hover:bg-forest/5 border border-forest/10 scale-95 hover:scale-100'}`}
              >
                {tab.icon} <span className="hidden sm:inline">{tab.label}</span><span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="grid gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* TAB: SETUP GUIDE */}
            {activeTab === 'setup' && (
              <div className="space-y-12">
                 <div className="bg-white p-8 rounded-2xl border border-forest/10 shadow-sm max-w-2xl">
                    <h2 className="font-display text-2xl uppercase tracking-widest text-terracotta font-bold mb-6">Cloudinary Setup Guide</h2>
                    <p className="font-sans text-forest/80 text-sm mb-6 leading-relaxed">
                      To upload images permanently, you need to configure <b>Cloudinary</b>. Without it, images are converted to data URLs and stored in LocalStorage, which will quickly run out of memory and break.
                    </p>
                    
                    <div className="space-y-6 text-sm text-forest/90 bg-forest/5 p-6 rounded-xl border border-forest/10">
                      <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-terracotta text-white flex items-center justify-center font-bold shrink-0">1</div>
                        <div>
                          <p className="font-bold mb-1">Create a free Cloudinary account</p>
                          <p>Go to <a href="https://cloudinary.com" target="_blank" rel="noreferrer" className="text-terracotta underline">cloudinary.com</a> and sign up.</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-terracotta text-white flex items-center justify-center font-bold shrink-0">2</div>
                        <div>
                          <p className="font-bold mb-1">Find your Cloud Name</p>
                          <p>On your dashboard, look for your <b>Cloud Name</b>. It usually looks like <code className="bg-white px-2 py-0.5 rounded text-xs border border-forest/10">dxxxxxxxx</code>.</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-terracotta text-white flex items-center justify-center font-bold shrink-0">3</div>
                        <div>
                          <p className="font-bold mb-1">Create an Unsigned Upload Preset</p>
                          <ul className="list-disc pl-5 mt-2 space-y-1 text-forest/70">
                            <li>Go to <b>Settings</b> (gear icon) &gt; <b>Upload</b></li>
                            <li>Scroll down to <b>Upload Presets</b> and click <b>Add upload preset</b></li>
                            <li>Change <b>Signing Mode</b> to <b>Unsigned</b></li>
                            <li>Copy the <b>Upload preset name</b> (e.g., <code className="bg-white px-2 py-0.5 rounded text-xs border border-forest/10">ml_default</code>)</li>
                            <li>Click <b>Save</b></li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-terracotta text-white flex items-center justify-center font-bold shrink-0">4</div>
                        <div>
                          <p className="font-bold mb-1">Add to Settings / Secrets</p>
                          <p className="mb-2">Go to your App settings (or `.env` file) and add the following variables:</p>
                          <div className="bg-white p-3 rounded font-mono text-xs border border-forest/10">
                            VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name<br/>
                            VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name
                          </div>
                          <p className="mt-3 text-xs text-forest/60 italic">If using an AI Studio or Replit environment, add these to your Secrets/Environment Variables tab. Then restart your application.</p>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            )}

            
            {/* TAB: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="max-w-xl">
                 <div className="bg-white rounded-3xl p-8 border border-forest/10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-forest to-terracotta"></div>
                    <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center text-terracotta mb-6">
                      <KeyRound size={24} />
                    </div>
                    <h2 className="font-display text-2xl uppercase tracking-widest text-forest font-bold mb-2">Change Password</h2>
                    <p className="font-sans text-forest/60 text-sm mb-8">Update the master password used to access this control center. Your new password will be securely hashed.</p>
                    
                    <form onSubmit={handlePasswordChange} className="flex flex-col gap-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-forest/60 mb-2 font-display">Current Password</label>
                        <input 
                          type="password" 
                          value={currentPasswordInput}
                          onChange={(e) => setCurrentPasswordInput(e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-forest/5 border border-forest/10 rounded-lg focus:outline-none focus:border-terracotta transition-colors text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-forest/60 mb-2 font-display">New Password</label>
                          <input 
                            type="password" 
                            value={newPasswordInput}
                            onChange={(e) => setNewPasswordInput(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-4 py-3 bg-forest/5 border border-forest/10 rounded-lg focus:outline-none focus:border-terracotta transition-colors text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-forest/60 mb-2 font-display">Confirm New Password</label>
                          <input 
                            type="password" 
                            value={confirmPasswordInput}
                            onChange={(e) => setConfirmPasswordInput(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-4 py-3 bg-forest/5 border border-forest/10 rounded-lg focus:outline-none focus:border-terracotta transition-colors text-sm"
                          />
                        </div>
                      </div>
                      
                      {settingsError && <p className="text-red-500 text-xs mt-1 font-sans px-1">{settingsError}</p>}
                      {settingsSuccess && <p className="text-green-600 text-xs mt-1 font-sans px-1">{settingsSuccess}</p>}
                      
                      <button type="submit" className="mt-4 bg-forest text-ivory py-3.5 rounded-lg uppercase font-display tracking-widest text-sm font-bold hover:bg-terracotta transition-colors">
                        Update Password
                      </button>
                    </form>
                 </div>

                 <div className="bg-white rounded-3xl p-8 border border-forest/10 shadow-sm relative overflow-hidden mt-8">
                    <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center text-forest mb-6">
                      <Layers size={24} />
                    </div>
                    <h2 className="font-display text-2xl uppercase tracking-widest text-forest font-bold mb-2">Backup & Restore Site Data</h2>
                    <p className="font-sans text-forest/60 text-sm mb-8">Download your entire website's content data (text and image links) as a JSON backup file. You can upload it later on any device to restore your site instantly.</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => {
                          const str = JSON.stringify(data, null, 2);
                          if (!str || str === '{}') return showToast("No data to backup yet.");
                          const blob = new Blob([str], { type: "application/json" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `krishna_interiors_backup_${new Date().toISOString().split('T')[0]}.json`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }}
                        className="bg-forest/5 text-forest hover:bg-forest/10 border border-forest/20 py-3.5 px-6 rounded-lg uppercase font-display tracking-widest text-xs font-bold transition-colors w-full text-center"
                      >
                        Download Backup
                      </button>

                      <div className="relative w-full">
                        <input 
                          type="file" 
                          accept=".json"
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              try {
                                const parsed = JSON.parse(event.target?.result as string);
                                if (parsed && parsed.hero) {
                                  updateData(parsed);
                                  showToast("Data restored successfully! Refreshing...");
                                  setTimeout(() => window.location.reload(), 1500);
                                } else {
                                  alert("Invalid backup file. Missing core properties.");
                                }
                              } catch (err) {
                                alert("Failed to parse JSON file.");
                              }
                            };
                            reader.readAsText(file);
                          }}
                        />
                        <button className="bg-ivory text-terracotta border border-terracotta py-3.5 px-6 rounded-lg uppercase font-display tracking-widest text-xs font-bold transition-colors w-full z-0 relative group-hover:bg-terracotta/5">
                          Restore from Backup
                        </button>
                      </div>
                    </div>
                 </div>
              </div>
            )}

            {/* TAB: BASE CONFIG */}
            {activeTab === 'base' && (
              <div className="space-y-16">
                <section>
                  <h2 className="font-display text-2xl uppercase tracking-widest text-terracotta mb-8 border-l-4 border-terracotta pl-4 flex items-center gap-3"><span className="text-forest/30">01</span> Hero, Story & Branding</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <GridImageUploader label="Site Logo" currentImage={data.general.logo} onUpdate={(url) => updateData({ general: { ...data.general, logo: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Hero Poster Image" currentImage={data.hero.poster} onUpdate={(url) => updateData({ hero: { ...data.hero, poster: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <AdminTextInput label="Reviews Score (e.g. 4.8)" value={data.general.reviewsScore || "4.8"} onSave={(val) => updateData({ general: { ...data.general, reviewsScore: val } })} />
                    <AdminTextInput label="Reviews Count (e.g. 66)" value={data.general.reviewsCount || "66"} onSave={(val) => updateData({ general: { ...data.general, reviewsCount: val } })} />
                  </div>
                </section>

                <section>
                  <h2 className="font-display text-2xl uppercase tracking-widest text-terracotta mb-8 border-l-4 border-terracotta pl-4 flex items-center gap-3"><span className="text-forest/30">01.5</span> Before / After Gallery</h2>
                  <p className="text-forest/60 text-sm mb-6">Update the 4 comparison sliders to showcase your work.</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                    {data.beforeAfterGallery?.map((item, index) => (
                      <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-black/5 space-y-4">
                        <AdminTextInput label={`Slider ${index + 1} Title`} value={item.title} onSave={(val) => {
                          const newArr = [...data.beforeAfterGallery];
                          newArr[index] = { ...newArr[index], title: val };
                          updateData({ beforeAfterGallery: newArr });
                        }} />
                        <GridImageUploader label="Before Image" currentImage={item.before} onUpdate={(url) => {
                          const newArr = [...data.beforeAfterGallery];
                          newArr[index] = { ...newArr[index], before: url };
                          updateData({ beforeAfterGallery: newArr });
                        }} handleFileUpload={handleFileUpload} showToast={showToast} />
                        <GridImageUploader label="After Image" currentImage={item.after} onUpdate={(url) => {
                          const newArr = [...data.beforeAfterGallery];
                          newArr[index] = { ...newArr[index], after: url };
                          updateData({ beforeAfterGallery: newArr });
                        }} handleFileUpload={handleFileUpload} showToast={showToast} />
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="font-display text-2xl uppercase tracking-widest text-terracotta mb-8 border-l-4 border-terracotta pl-4 flex items-center gap-3"><span className="text-forest/30">02</span> About Us Page</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <GridImageUploader label="Architecture Background" currentImage={data.about.architectureBg} onUpdate={(url) => updateData({ about: { ...data.about, architectureBg: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Founder Portrait" currentImage={data.about.founder} onUpdate={(url) => updateData({ about: { ...data.about, founder: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Project Manager 1" currentImage={data.about.pm1} onUpdate={(url) => updateData({ about: { ...data.about, pm1: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <AdminTextInput label="PM 1 Name" value={data.about.pm1Name} onSave={(val) => updateData({ about: { ...data.about, pm1Name: val } })} />
                    <GridImageUploader label="Project Manager 2" currentImage={data.about.pm2} onUpdate={(url) => updateData({ about: { ...data.about, pm2: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <AdminTextInput label="PM 2 Name" value={data.about.pm2Name} onSave={(val) => updateData({ about: { ...data.about, pm2Name: val } })} />
                    <GridImageUploader label="Service: Kitchen" currentImage={data.about.services.kitchen} onUpdate={(url) => updateData({ about: { ...data.about, services: { ...data.about.services, kitchen: url } } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Service: Bedroom" currentImage={data.about.services.bedroom} onUpdate={(url) => updateData({ about: { ...data.about, services: { ...data.about.services, bedroom: url } } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Service: Living" currentImage={data.about.services.living} onUpdate={(url) => updateData({ about: { ...data.about, services: { ...data.about.services, living: url } } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Service: Civil" currentImage={data.about.services.civil} onUpdate={(url) => updateData({ about: { ...data.about, services: { ...data.about.services, civil: url } } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Service: Tiles" currentImage={data.about.services.tiles} onUpdate={(url) => updateData({ about: { ...data.about, services: { ...data.about.services, tiles: url } } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Service: Commercial" currentImage={data.about.services.commercial} onUpdate={(url) => updateData({ about: { ...data.about, services: { ...data.about.services, commercial: url } } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                  </div>
                </section>

                <section>
                  <h2 className="font-display text-2xl uppercase tracking-widest text-terracotta mb-8 border-l-4 border-terracotta pl-4 flex items-center gap-3"><span className="text-forest/30">03</span> Services List Icons</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <GridImageUploader label="Modular Kitchen" currentImage={data.servicesList.kitchen} onUpdate={(url) => updateData({ servicesList: { ...data.servicesList, kitchen: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Bedroom" currentImage={data.servicesList.bedroom} onUpdate={(url) => updateData({ servicesList: { ...data.servicesList, bedroom: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Living Room" currentImage={data.servicesList.living} onUpdate={(url) => updateData({ servicesList: { ...data.servicesList, living: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Civil Work" currentImage={data.servicesList.civil} onUpdate={(url) => updateData({ servicesList: { ...data.servicesList, civil: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                  </div>
                </section>
                
                <section>
                  <h2 className="font-display text-2xl uppercase tracking-widest text-terracotta mb-8 border-l-4 border-terracotta pl-4 flex items-center gap-3"><span className="text-forest/30">04</span> Interactive Board</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <GridImageUploader label="Completed Kitchen" currentImage={data.materials.complete} onUpdate={(url) => updateData({ materials: { ...data.materials, complete: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Hettich Partner" currentImage={data.interactiveBoard.hettich} onUpdate={(url) => updateData({ interactiveBoard: { ...data.interactiveBoard, hettich: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Blum Partner" currentImage={data.interactiveBoard.blum} onUpdate={(url) => updateData({ interactiveBoard: { ...data.interactiveBoard, blum: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Häfele Partner" currentImage={data.interactiveBoard.hafele} onUpdate={(url) => updateData({ interactiveBoard: { ...data.interactiveBoard, hafele: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Godrej Partner" currentImage={data.interactiveBoard.godrej} onUpdate={(url) => updateData({ interactiveBoard: { ...data.interactiveBoard, godrej: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Ozone Partner" currentImage={data.interactiveBoard.ozone} onUpdate={(url) => updateData({ interactiveBoard: { ...data.interactiveBoard, ozone: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Onyx Partner" currentImage={data.interactiveBoard.onyx} onUpdate={(url) => updateData({ interactiveBoard: { ...data.interactiveBoard, onyx: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                  </div>
                </section>

                <section>
                  <h2 className="font-display text-2xl uppercase tracking-widest text-terracotta mb-8 border-l-4 border-terracotta pl-4 flex items-center gap-3"><span className="text-forest/30">05</span> Anatomy of Perfection</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <GridImageUploader label="Inner Core (X-Ray)" currentImage={data.anatomy.inner} onUpdate={(url) => updateData({ anatomy: { ...data.anatomy, inner: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Outer Laminate (Surface)" currentImage={data.anatomy.outer} onUpdate={(url) => updateData({ anatomy: { ...data.anatomy, outer: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                  </div>
                </section>

                <section>
                  <h2 className="font-display text-2xl uppercase tracking-widest text-terracotta mb-8 border-l-4 border-terracotta pl-4 flex items-center gap-3"><span className="text-forest/30">06</span> Portfolio Preview Wall</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <GridImageUploader label="Large Feature Img" currentImage={data.portfolioPreview.img1} onUpdate={(url) => updateData({ portfolioPreview: { ...data.portfolioPreview, img1: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Top Right Img" currentImage={data.portfolioPreview.img2} onUpdate={(url) => updateData({ portfolioPreview: { ...data.portfolioPreview, img2: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                    <GridImageUploader label="Bottom Right Img" currentImage={data.portfolioPreview.img3} onUpdate={(url) => updateData({ portfolioPreview: { ...data.portfolioPreview, img3: url } })}  handleFileUpload={handleFileUpload} showToast={showToast} />
                  </div>
                </section>
              </div>
            )}

            {/* TAB: CATALOGUE */}
            {activeTab === 'catalogue' && (
              <div className="space-y-4">
                <div className="bg-white/60 p-6 rounded-2xl border border-forest/10 mb-8 flex items-start gap-4">
                  <div className="p-3 bg-terracotta/10 rounded-full text-terracotta"><Camera size={24} /></div>
                  <div>
                    <h3 className="font-display uppercase tracking-widest font-semibold text-forest mb-2">Configure Specifications Galleries</h3>
                    <p className="font-sans font-light text-forest/70 text-sm max-w-3xl leading-relaxed">
                      Click on any category below to expand. You can then change its main cover, and manage the image galleries for each individual specification. These multi-image galleries will be shown to users when they click a specification in the frontend modal.
                    </p>
                  </div>
                </div>

                <div className="grid gap-6">
                  {data.catalogue.map((cat) => (
                    <details key={cat.id} className="bg-white rounded-2xl shadow-sm border border-forest/10 group overflow-hidden transition-all duration-300">
                      <summary className="p-6 md:p-8 font-display text-xl uppercase tracking-wider text-forest font-semibold cursor-pointer list-none flex justify-between items-center bg-white hover:bg-forest/5 transition-colors">
                        <div className="flex items-center gap-6">
                          <span className="text-terracotta border-b-2 border-terracotta pb-1 leading-none">{cat.id}</span>
                          <span className="leading-none">{cat.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] tracking-widest opacity-60 bg-forest/5 px-4 py-2 rounded-full font-display border border-forest/10 group-open:hidden">EXPAND TO EDIT</span>
                           <span className="text-[10px] tracking-widest text-terracotta bg-terracotta/10 px-4 py-2 rounded-full font-display border border-terracotta/20 hidden group-open:inline">COLLAPSE CATEGORY</span>
                        </div>
                      </summary>
                      
                      <div className="p-6 md:p-8 grid gap-16 bg-ivory/50 border-t border-forest/5">
                        
                        {/* Section: Category Cover */}
                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <h4 className="font-display uppercase text-sm tracking-widest text-forest/80 font-semibold bg-white px-4 py-2 rounded-lg shadow-sm w-max border border-forest/10">Main Thumbnail</h4>
                          </div>
                          <div className="w-full md:w-1/3 xl:w-1/4 min-w-[250px]">
                            <GridImageUploader 
                              label={`${cat.title} Cover`}
                              currentImage={cat.image}
                              onUpdate={(url) => updateCatalogueCover(cat.id, url)}
                             handleFileUpload={handleFileUpload} showToast={showToast} />
                          </div>
                        </div>
                        
                        {/* Section: Specifications */}
                        <div>
                          <div className="flex items-center gap-3 mb-8">
                            <h4 className="font-display uppercase text-sm tracking-widest text-forest/80 font-semibold bg-white px-4 py-2 rounded-lg shadow-sm w-max border border-forest/10">Specification Galleries</h4>
                          </div>
                          
                          <div className="grid gap-8">
                            {cat.items.map((subItem, idx) => (
                              <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl border border-forest/10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] relative">
                                
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-forest/5">
                                  <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-forest text-ivory flex items-center justify-center font-display text-sm font-bold shadow-md">
                                      {idx + 1}
                                    </div>
                                    <h5 className="font-serif italic text-forest text-xl md:text-2xl leading-none pt-1">
                                      {subItem.name}
                                    </h5>
                                  </div>
                                  <button 
                                    onClick={() => addCatalogueSubItemImage(cat.id, idx, "")}
                                    className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-terracotta border border-terracotta/30 hover:bg-terracotta hover:text-ivory px-5 py-2.5 rounded-full transition-colors font-semibold"
                                  >
                                    <Plus size={14} /> Add Image To "{subItem.name}"
                                  </button>
                                </div>

                                {(!subItem.images || subItem.images.length === 0) ? (
                                  <div className="text-center py-10 bg-forest/5 rounded-xl border-2 border-dashed border-forest/10 text-forest/50 text-sm font-sans flex flex-col items-center gap-3">
                                    <Camera size={24} className="opacity-50" />
                                    No images assigned to this specification. Click the Add Image button above.
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                    {subItem.images.map((imgUrl, imgIdx) => (
                                      <GridImageUploader 
                                        key={imgIdx}
                                        label={`Spec Image ${imgIdx + 1}`} 
                                        currentImage={imgUrl} 
                                        onUpdate={(url) => {
                                          // Update catalogue subitem locally
                                          const newData = { ...data };
                                          const targetCat = newData.catalogue.find(c => c.id === cat.id);
                                          if(targetCat && targetCat.items[idx]) {
                                            const newImages = [...targetCat.items[idx].images];
                                            newImages[imgIdx] = url;
                                            targetCat.items[idx].images = newImages;
                                            updateData(newData);
                                          }
                                        }}
                                        onRemove={() => removeCatalogueSubItemImage(cat.id, idx, imgIdx)}
                                       handleFileUpload={handleFileUpload} showToast={showToast} />
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <div className="space-y-12">
                
                {/* Create Project Hero */}
                <div className="bg-white rounded-3xl p-8 border border-forest/10 shadow-lg relative overflow-hidden">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-forest/5 rounded-full pointer-events-none mix-blend-multiply"></div>
                  <h3 className="font-display font-semibold uppercase tracking-widest text-lg text-forest mb-6 flex items-center gap-3">
                    <Plus className="text-terracotta" /> Add New Masterpiece
                  </h3>
                  <NewProjectForm showToast={showToast} useSiteDataHook={useSiteData} />
                </div>
                
                {/* Projects List */}
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-forest/10 pb-4 mb-8 gap-4">
                    <h3 className="font-display font-semibold uppercase tracking-widest text-lg text-forest/60">
                      Existing Portfolio Projects ({data.portfolio.length})
                    </h3>
                    {data.portfolio.length === 0 && (
                      <div className="relative">
                        {showConfirmRestore ? (
                          <div className="absolute right-0 top-full mt-2 bg-white shadow-xl border border-terracotta/20 p-3 rounded-xl flex items-center gap-3 z-20 w-max">
                            <span className="text-xs uppercase font-display font-bold text-terracotta">Restore Samples?</span>
                            <button 
                              onClick={() => {
                                updateData({
                                  portfolio: [
                                    {
                                      id: 1,
                                      title: "The Oasis",
                                      location: "Kalyani Nagar",
                                      images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&fit=crop"],
                                      color: "#1d2524",
                                    },
                                    {
                                      id: 2,
                                      title: "Sunlit Serenade",
                                      location: "Koregoan Park",
                                      images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&fit=crop"],
                                      color: "#e3d5c8",
                                    },
                                    {
                                      id: 3,
                                      title: "Brutalist Warmth",
                                      location: "Baner",
                                      images: ["https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=2000&fit=crop"],
                                      color: "#6b5e54",
                                    },
                                    {
                                      id: 4,
                                      title: "Urban Minimalist",
                                      location: "Viman Nagar",
                                      images: ["https://images.unsplash.com/photo-1598928302598-a832cb5e6cbf?q=80&w=2000&fit=crop"],
                                      color: "#353e4c",
                                    },
                                  ]
                                });
                                setShowConfirmRestore(false);
                                showToast("Sample portfolio restored.");
                              }}
                              className="bg-terracotta text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-terracotta/90 transition-colors"
                            >
                              Yes
                            </button>
                            <button 
                              onClick={() => setShowConfirmRestore(false)}
                              className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setShowConfirmRestore(true)}
                            className="text-xs uppercase font-display tracking-widest bg-forest text-ivory px-4 py-2 rounded-lg hover:bg-forest/90 transition-colors"
                          >
                            Restore Defaults
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {data.portfolio.map((item, portfolioIndex) => (
                    <ProjectEditorCard key={item.id} item={item} portfolioIndex={portfolioIndex} showToast={showToast} handleFileUpload={handleFileUpload} useSiteDataHook={useSiteData} />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </PageTransition>
  );
}

