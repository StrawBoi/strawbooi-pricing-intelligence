/*
 * Strawbooi Pricing Intelligence Platform
 * Copyright (c) 2025 Strawbooi. All rights reserved.
 * Configure Alerts Modal Component
 */

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { AlertTriangle, Mail, Smartphone, Bell, Zap } from "lucide-react";
import { toast } from "sonner";

const ConfigureAlertsModal = ({ isOpen, onClose }) => {
  const [alertSettings, setAlertSettings] = useState({
    // Alert Types
    priceDrops: true,
    priceSpikes: true,
    competitiveAdvantage: true,
    stockOutages: false,
    
    // Thresholds
    priceDropThreshold: 5,
    priceSpikeThreshold: 10,
    competitorDifferenceThreshold: 15,
    
    // Notification Methods
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    
    // Email Settings
    emailAddress: '',
    
    // Frequency
    alertFrequency: 'immediate',
    
    // Advanced
    enableMachineLearning: true,
    anomalyDetectionSensitivity: 'medium'
  });

  const handleSwitchChange = (key, value) => {
    setAlertSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleInputChange = (key, value) => {
    setAlertSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Validate email if email notifications are enabled
    if (alertSettings.emailNotifications && !alertSettings.emailAddress) {
      toast.error("Please enter an email address for email notifications");
      return;
    }

    // Simulate saving settings
    toast.success("Alert settings saved successfully!", {
      description: "You'll receive notifications based on your preferences",
    });
    
    onClose();
  };

  const alertTypeCards = [
    {
      id: 'priceDrops',
      title: 'Price Drops',
      description: 'Get notified when competitors lower their prices',
      icon: <Zap className="h-5 w-5 text-green-400" />,
      color: 'border-green-500/30 bg-green-950/20'
    },
    {
      id: 'priceSpikes',
      title: 'Price Spikes',
      description: 'Alert when competitors increase prices significantly',
      icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
      color: 'border-red-500/30 bg-red-950/20'
    },
    {
      id: 'competitiveAdvantage',
      title: 'Competitive Advantage',
      description: 'Identify opportunities to gain market advantage',
      icon: <Bell className="h-5 w-5 text-blue-400" />,
      color: 'border-blue-500/30 bg-blue-950/20'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <span>Configure Smart Alerts</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Set up intelligent alerts to never miss important price changes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Alert Types */}
          <div>
            <h3 className="text-white font-semibold mb-4">Alert Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {alertTypeCards.map(alert => (
                <Card key={alert.id} className={`${alert.color} border transition-all duration-300 hover:scale-105`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {alert.icon}
                        <CardTitle className="text-white text-sm">{alert.title}</CardTitle>
                      </div>
                      <Switch
                        checked={alertSettings[alert.id]}
                        onCheckedChange={(checked) => handleSwitchChange(alert.id, checked)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-slate-300 text-xs">{alert.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator className="bg-slate-700" />

          {/* Thresholds */}
          <div>
            <h3 className="text-white font-semibold mb-4">Alert Thresholds</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white">Price Drop Threshold (%)</Label>
                <Input
                  type="number"
                  value={alertSettings.priceDropThreshold}
                  onChange={(e) => handleInputChange('priceDropThreshold', parseFloat(e.target.value))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  min="1"
                  max="50"
                />
                <p className="text-xs text-slate-400 mt-1">Alert when price drops by this percentage</p>
              </div>

              <div>
                <Label className="text-white">Price Spike Threshold (%)</Label>
                <Input
                  type="number"
                  value={alertSettings.priceSpikeThreshold}
                  onChange={(e) => handleInputChange('priceSpikeThreshold', parseFloat(e.target.value))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  min="1"
                  max="100"
                />
                <p className="text-xs text-slate-400 mt-1">Alert when price increases by this percentage</p>
              </div>

              <div>
                <Label className="text-white">Competitor Difference ($)</Label>
                <Input
                  type="number"
                  value={alertSettings.competitorDifferenceThreshold}
                  onChange={(e) => handleInputChange('competitorDifferenceThreshold', parseFloat(e.target.value))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  min="1"
                />
                <p className="text-xs text-slate-400 mt-1">Alert when price difference exceeds this amount</p>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-700" />

          {/* Notification Methods */}
          <div>
            <h3 className="text-white font-semibold mb-4">Notification Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">Email Notifications</p>
                    <p className="text-slate-400 text-sm">Receive detailed alerts via email</p>
                  </div>
                </div>
                <Switch
                  checked={alertSettings.emailNotifications}
                  onCheckedChange={(checked) => handleSwitchChange('emailNotifications', checked)}
                />
              </div>

              {alertSettings.emailNotifications && (
                <div className="ml-8">
                  <Label className="text-white">Email Address</Label>
                  <Input
                    type="email"
                    value={alertSettings.emailAddress}
                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                    placeholder="your@email.com"
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Push Notifications</p>
                    <p className="text-slate-400 text-sm">Real-time browser notifications</p>
                  </div>
                </div>
                <Switch
                  checked={alertSettings.pushNotifications}
                  onCheckedChange={(checked) => handleSwitchChange('pushNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">SMS Notifications</p>
                    <p className="text-slate-400 text-sm">Critical alerts via text message</p>
                  </div>
                </div>
                <Switch
                  checked={alertSettings.smsNotifications}
                  onCheckedChange={(checked) => handleSwitchChange('smsNotifications', checked)}
                />
              </div>
            </div>
          </div>

          <Separator className="bg-slate-700" />

          {/* Advanced Settings */}
          <div>
            <h3 className="text-white font-semibold mb-4">Advanced Settings</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-white">Alert Frequency</Label>
                <Select value={alertSettings.alertFrequency} onValueChange={(value) => handleInputChange('alertFrequency', value)}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="immediate" className="text-white">Immediate</SelectItem>
                    <SelectItem value="hourly" className="text-white">Hourly Summary</SelectItem>
                    <SelectItem value="daily" className="text-white">Daily Summary</SelectItem>
                    <SelectItem value="weekly" className="text-white">Weekly Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white">Anomaly Detection Sensitivity</Label>
                <Select value={alertSettings.anomalyDetectionSensitivity} onValueChange={(value) => handleInputChange('anomalyDetectionSensitivity', value)}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="low" className="text-white">Low (Less alerts)</SelectItem>
                    <SelectItem value="medium" className="text-white">Medium (Balanced)</SelectItem>
                    <SelectItem value="high" className="text-white">High (More alerts)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Enable Machine Learning</p>
                  <p className="text-slate-400 text-sm">Use AI to improve alert accuracy over time</p>
                </div>
                <Switch
                  checked={alertSettings.enableMachineLearning}
                  onCheckedChange={(checked) => handleSwitchChange('enableMachineLearning', checked)}
                />
              </div>
            </div>
          </div>

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
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105"
            >
              Save Alert Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigureAlertsModal;