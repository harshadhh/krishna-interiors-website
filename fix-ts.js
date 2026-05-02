import fs from 'fs';

let content = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

// replace parameter definition for ProjectEditorCard
content = content.replace(
  'const ProjectEditorCard = ({ item, portfolioIndex, handleFileUpload, showToast, useSiteDataHook }: { item: any, portfolioIndex: number, handleFileUpload: any, showToast: any, useSiteDataHook: any }) => {',
  'const ProjectEditorCard = ({ item, portfolioIndex, handleFileUpload, showToast, useSiteDataHook }: any) => {'
);


// Find all GridImageUploader
let startIndex = 0;
while (true) {
  const index = content.indexOf('<GridImageUploader ', startIndex);
  if (index === -1) break;
  
  // Find the end of this tag (the '/>')
  const endIndex = content.indexOf('/>', index);
  if (endIndex === -1) break;
  
  const tagContent = content.substring(index, endIndex);
  if (!tagContent.includes('showToast={showToast}')) {
    // Inject before the end
    content = content.substring(0, endIndex) + ' handleFileUpload={handleFileUpload} showToast={showToast} ' + content.substring(endIndex);
  }
  
  startIndex = endIndex + 2;
}

// Check for CinematicPortfolio.tsx and remove the unused imported AnimatePresence from "motion/react" if it gives errors. No, CinematicPortfolio only had that TS error because of `key`.
// Let's modify CinematicPortfolio.tsx parameter to use `any` object with key or just ignore it.

fs.writeFileSync('src/pages/Admin.tsx', content);

// For CinematicPortfolio.tsx
let cinemContent = fs.readFileSync('src/components/CinematicPortfolio.tsx', 'utf8');
cinemContent = cinemContent.replace(
  'function CinematicPortfolioInner({ items }: { items: any[] }) {',
  'function CinematicPortfolioInner({ items, key }: { items: any[], key?: any }) {'
);
fs.writeFileSync('src/components/CinematicPortfolio.tsx', cinemContent);

console.log('Fixed TS errors.');
