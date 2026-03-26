import React, { useState } from 'react';
import { mockCases } from '../data/mock';
import { X, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';

const CasesSection = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <>
      <section id="cases" className="relative py-24 bg-neutral-950">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              CASES
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Projetos que elevam marcas e fortalecem posicionamento
            </p>
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCases.map((caseItem) => (
              <div 
                key={caseItem.id}
                className="group relative overflow-hidden bg-neutral-900 cursor-pointer hover:transform hover:scale-[1.02] transition-all duration-300"
                onClick={() => setSelectedCase(caseItem)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                  
                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-black ml-1" fill="black" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {caseItem.title}
                  </h3>
                  <p className="text-white/60 mb-4 text-sm leading-relaxed">
                    {caseItem.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {caseItem.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="border-white/20 text-white/70 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-4xl bg-black border-neutral-800">
          {selectedCase && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-white">
                  {selectedCase.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="relative h-[400px] overflow-hidden">
                  <img 
                    src={selectedCase.image}
                    alt={selectedCase.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p className="text-white/70 leading-relaxed">
                  {selectedCase.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {selectedCase.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="border-white/20 text-white/70"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CasesSection;
