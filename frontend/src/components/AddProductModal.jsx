/*
 * Strawbooi Pricing Intelligence Platform
 * Copyright (c) 2025 Strawbooi. All rights reserved.
 * Interactive Add Product Modal Component
 */

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Plus, X, Target, Globe, DollarSign } from "lucide-react";
import { toast } from "sonner";

const AddProductModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    targetPrice: '',
    competitors: []
  });
  const [newCompetitor, setNewCompetitor] = useState({
    name: '',
    url: ''
  });

  const categories = [
    'Electronics',
    'Computers',
    'Smartphones',
    'Gaming',
    'Home & Garden',
    'Fashion',
    'Books',
    'Health & Beauty'
  ];

  const popularCompetitors = [
    'Amazon',
    'eBay',
    'Best Buy',
    'Walmart',
    'Target',
    'Newegg',
    'Apple Store',
    'Samsung Store',
    'Microsoft Store'
  ];

  const handleAddCompetitor = () => {
    if (newCompetitor.name && newCompetitor.url) {
      setFormData(prev => ({
        ...prev,
        competitors: [...prev.competitors, { ...newCompetitor, id: Date.now() }]
      }));
      setNewCompetitor({ name: '', url: '' });
      toast.success(`Added ${newCompetitor.name} as competitor`);
    }
  };

  const handleRemoveCompetitor = (id) => {
    setFormData(prev => ({
      ...prev,
      competitors: prev.competitors.filter(comp => comp.id !== id)
    }));
  };

  const handleQuickAddCompetitor = (competitorName) => {
    const exists = formData.competitors.some(comp => comp.name === competitorName);
    if (!exists) {
      setFormData(prev => ({
        ...prev,
        competitors: [...prev.competitors, { 
          id: Date.now(), 
          name: competitorName, 
          url: `https://${competitorName.toLowerCase().replace(/\s+/g, '')}.com` 
        }]
      }));
      toast.success(`Added ${competitorName} to tracking list`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || formData.competitors.length === 0) {
      toast.error("Please fill in all required fields and add at least one competitor");
      return;
    }

    // Simulate adding product
    toast.success(`Successfully added "${formData.name}" to your tracking list!`, {
      description: `Now monitoring ${formData.competitors.length} competitors`,
    });
    
    // Reset form
    setFormData({
      name: '',
      category: '',
      targetPrice: '',
      competitors: []
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-400" />
            <span>Add New Product to Track</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Set up competitor price monitoring for your product
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="productName" className="text-white">Product Name *</Label>
              <Input
                id="productName"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., iPhone 15 Pro Max 256GB"
                className="bg-slate-700 border-slate-600 text-white mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-white">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {categories.map(category => (
                      <SelectItem key={category} value={category} className="text-white">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="targetPrice" className="text-white">Target Price (Optional)</Label>
                <Input
                  id="targetPrice"
                  type="number"
                  step="0.01"
                  value={formData.targetPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetPrice: e.target.value }))}
                  placeholder="999.99"
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>
            </div>
          </div>

          {/* Quick Add Competitors */}
          <div>
            <Label className="text-white">Quick Add Popular Competitors</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {popularCompetitors.map(competitor => (
                <Button
                  key={competitor}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAddCompetitor(competitor)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 transition-all duration-200 hover:scale-105"
                  disabled={formData.competitors.some(comp => comp.name === competitor)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {competitor}
                </Button>
              ))}
            </div>
          </div>

          {/* Manual Add Competitor */}
          <div>
            <Label className="text-white">Add Custom Competitor</Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Competitor name"
                value={newCompetitor.name}
                onChange={(e) => setNewCompetitor(prev => ({ ...prev, name: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Input
                placeholder="Website URL"
                value={newCompetitor.url}
                onChange={(e) => setNewCompetitor(prev => ({ ...prev, url: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Button
                type="button"
                onClick={handleAddCompetitor}
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Selected Competitors */}
          {formData.competitors.length > 0 && (
            <div>
              <Label className="text-white">Selected Competitors ({formData.competitors.length})</Label>
              <div className="space-y-2 mt-2 max-h-32 overflow-y-auto">
                {formData.competitors.map(competitor => (
                  <Card key={competitor.id} className="bg-slate-700/50 border-slate-600">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-blue-400" />
                          <span className="text-white font-medium">{competitor.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {competitor.url}
                          </Badge>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCompetitor(competitor.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105 flex items-center space-x-2"
            >
              <Target className="h-4 w-4" />
              <span>Start Tracking</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;