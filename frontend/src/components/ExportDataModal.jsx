/*
 * Strawbooi Pricing Intelligence Platform
 * Copyright (c) 2025 Strawbooi. All rights reserved.
 * Export Data Modal Component
 */

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import { 
  Download, 
  FileText, 
  Database, 
  BarChart3, 
  Calendar as CalendarIcon,
  CheckCircle,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

const ExportDataModal = ({ isOpen, onClose }) => {
  const [exportSettings, setExportSettings] = useState({
    dataTypes: {
      priceHistory: true,
      anomalies: true,
      alerts: true,
      strategies: false,
      competitors: true
    },
    format: 'csv',
    dateRange: 'last30days',
    customDateRange: {
      from: null,
      to: null
    }
  });
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const dataTypeOptions = [
    {
      id: 'priceHistory',
      title: 'Price History',
      description: 'Historical price data for all tracked products',
      icon: <BarChart3 className="h-4 w-4 text-blue-400" />,
      estimatedSize: '2.3 MB'
    },
    {
      id: 'anomalies',
      title: 'Anomaly Detection Results',
      description: 'All detected price anomalies and patterns',
      icon: <Database className="h-4 w-4 text-red-400" />,
      estimatedSize: '856 KB'
    },
    {
      id: 'alerts',
      title: 'Alert History',
      description: 'Complete history of generated alerts',
      icon: <FileText className="h-4 w-4 text-yellow-400" />,
      estimatedSize: '432 KB'
    },
    {
      id: 'strategies',
      title: 'Pricing Strategies',
      description: 'AI-generated pricing recommendations',
      icon: <CheckCircle className="h-4 w-4 text-green-400" />,
      estimatedSize: '123 KB'
    },
    {
      id: 'competitors',
      title: 'Competitor Data',
      description: 'Competitor information and tracking settings',
      icon: <Database className="h-4 w-4 text-purple-400" />,
      estimatedSize: '67 KB'
    }
  ];

  const formatOptions = [
    { value: 'csv', label: 'CSV', description: 'Comma-separated values (Excel compatible)' },
    { value: 'json', label: 'JSON', description: 'JavaScript Object Notation (API friendly)' },
    { value: 'xlsx', label: 'Excel', description: 'Microsoft Excel workbook' },
    { value: 'pdf', label: 'PDF', description: 'Formatted report document' }
  ];

  const dateRangeOptions = [
    { value: 'last7days', label: 'Last 7 days' },
    { value: 'last30days', label: 'Last 30 days' },
    { value: 'last90days', label: 'Last 90 days' },
    { value: 'lastyear', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const handleDataTypeChange = (dataType, checked) => {
    setExportSettings(prev => ({
      ...prev,
      dataTypes: {
        ...prev.dataTypes,
        [dataType]: checked
      }
    }));
  };

  const handleExport = async () => {
    const selectedTypes = Object.entries(exportSettings.dataTypes)
      .filter(([_, selected]) => selected)
      .map(([type, _]) => type);

    if (selectedTypes.length === 0) {
      toast.error("Please select at least one data type to export");
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    // Simulate export process
    const steps = [
      { message: "Preparing data export...", progress: 20 },
      { message: "Collecting price history...", progress: 40 },
      { message: "Processing anomaly data...", progress: 60 },
      { message: "Generating report...", progress: 80 },
      { message: "Finalizing export...", progress: 100 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setExportProgress(steps[i].progress);
      
      if (i === steps.length - 1) {
        toast.success("Data exported successfully!", {
          description: `Downloaded ${selectedTypes.length} datasets in ${exportSettings.format.toUpperCase()} format`,
        });
        
        // Simulate file download
        const blob = new Blob([`Strawbooi Export - ${new Date().toISOString()}`], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `strawbooi-pricing-data-${format(new Date(), 'yyyy-MM-dd')}.${exportSettings.format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }

    setTimeout(() => {
      setIsExporting(false);
      setExportProgress(0);
      onClose();
    }, 1500);
  };

  const getTotalSize = () => {
    const selectedTypes = Object.entries(exportSettings.dataTypes)
      .filter(([_, selected]) => selected)
      .map(([type, _]) => type);
    
    return dataTypeOptions
      .filter(option => selectedTypes.includes(option.id))
      .reduce((total, option) => {
        const size = parseFloat(option.estimatedSize.split(' ')[0]);
        const unit = option.estimatedSize.split(' ')[1];
        return total + (unit === 'MB' ? size * 1024 : size);
      }, 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center space-x-2">
            <Download className="h-5 w-5 text-green-400" />
            <span>Export Pricing Data</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Download your pricing intelligence data in various formats
          </DialogDescription>
        </DialogHeader>

        {!isExporting ? (
          <div className="space-y-6">
            {/* Data Types Selection */}
            <div>
              <h3 className="text-white font-semibold mb-4">Select Data to Export</h3>
              <div className="space-y-3">
                {dataTypeOptions.map(option => (
                  <Card key={option.id} className="bg-slate-700/30 border-slate-600 transition-all duration-200 hover:bg-slate-700/50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={option.id}
                          checked={exportSettings.dataTypes[option.id]}
                          onCheckedChange={(checked) => handleDataTypeChange(option.id, checked)}
                          className="border-slate-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {option.icon}
                            <Label htmlFor={option.id} className="text-white font-medium cursor-pointer">
                              {option.title}
                            </Label>
                            <Badge variant="outline" className="text-xs">
                              {option.estimatedSize}
                            </Badge>
                          </div>
                          <p className="text-slate-400 text-sm">{option.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Export Format */}
            <div>
              <h3 className="text-white font-semibold mb-4">Export Format</h3>
              <Select value={exportSettings.format} onValueChange={(value) => setExportSettings(prev => ({ ...prev, format: value }))}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {formatOptions.map(format => (
                    <SelectItem key={format.value} value={format.value} className="text-white">
                      <div>
                        <div className="font-medium">{format.label}</div>
                        <div className="text-xs text-slate-400">{format.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div>
              <h3 className="text-white font-semibold mb-4">Date Range</h3>
              <Select value={exportSettings.dateRange} onValueChange={(value) => setExportSettings(prev => ({ ...prev, dateRange: value }))}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {dateRangeOptions.map(range => (
                    <SelectItem key={range.value} value={range.value} className="text-white">
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {exportSettings.dateRange === 'custom' && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">From Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-slate-700 border-slate-600 text-white",
                            !exportSettings.customDateRange.from && "text-slate-400"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {exportSettings.customDateRange.from ? format(exportSettings.customDateRange.from, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-slate-700 border-slate-600">
                        <Calendar
                          mode="single"
                          selected={exportSettings.customDateRange.from}
                          onSelect={(date) => setExportSettings(prev => ({
                            ...prev,
                            customDateRange: { ...prev.customDateRange, from: date }
                          }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label className="text-white">To Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-slate-700 border-slate-600 text-white",
                            !exportSettings.customDateRange.to && "text-slate-400"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {exportSettings.customDateRange.to ? format(exportSettings.customDateRange.to, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-slate-700 border-slate-600">
                        <Calendar
                          mode="single"
                          selected={exportSettings.customDateRange.to}
                          onSelect={(date) => setExportSettings(prev => ({
                            ...prev,
                            customDateRange: { ...prev.customDateRange, to: date }
                          }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
            </div>

            {/* Export Summary */}
            <Card className="bg-slate-700/20 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white text-sm">Export Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Selected datasets:</span>
                    <span>{Object.values(exportSettings.dataTypes).filter(Boolean).length}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Estimated size:</span>
                    <span>{getTotalSize() > 1024 ? (getTotalSize() / 1024).toFixed(1) + ' MB' : getTotalSize().toFixed(0) + ' KB'}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Format:</span>
                    <span>{exportSettings.format.toUpperCase()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleExport}
                className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105 flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-8">
            <div className="text-center mb-6">
              <Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">Exporting Your Data</h3>
              <p className="text-slate-400">Please wait while we prepare your export...</p>
            </div>
            
            <div className="space-y-4">
              <Progress value={exportProgress} className="w-full" />
              <div className="text-center">
                <span className="text-slate-300 text-sm">{exportProgress}% Complete</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExportDataModal;