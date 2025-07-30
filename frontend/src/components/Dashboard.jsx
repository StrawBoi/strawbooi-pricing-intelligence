/*
 * Strawbooi Pricing Intelligence Platform
 * Copyright (c) 2025 Strawbooi. All rights reserved.
 * Advanced 3D Interactive Dashboard Component
 */

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import PriceChart from "./PriceChart";
import AnomalyAlert from "./AnomalyAlert";
import StrategyRecommendations from "./StrategyRecommendations";
import RealTimeUpdates from "./RealTimeUpdates";
import FloatingGrid from "./FloatingGrid";
import AddProductModal from "./AddProductModal";
import ConfigureAlertsModal from "./ConfigureAlertsModal";
import ExportDataModal from "./ExportDataModal";
import { 
  mockProducts, 
  mockAlerts, 
  mockPricingStrategies, 
  mockDashboardStats,
  generateRealtimeUpdate 
} from "../data/mock";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target, 
  Activity,
  Zap,
  Eye,
  ShoppingCart
} from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);
  const [realtimeUpdates, setRealtimeUpdates] = useState([]);
  const [isLive, setIsLive] = useState(true);
  
  // Modal states
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showConfigureAlertsModal, setShowConfigureAlertsModal] = useState(false);
  const [showExportDataModal, setShowExportDataModal] = useState(false);

  // Parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      const update = generateRealtimeUpdate();
      setRealtimeUpdates(prev => [update, ...prev.slice(0, 9)]); // Keep last 10 updates
      
      // Show toast for significant price changes
      if (Math.abs(parseFloat(update.change_percentage)) > 2) {
        toast(`${update.product} - ${update.competitor}`, {
          description: `Price ${update.change_percentage > 0 ? 'increased' : 'decreased'} by ${Math.abs(update.change_percentage)}%`,
          duration: 3000,
        });
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const activeAlertsCount = mockAlerts.filter(alert => alert.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 dark-gradient-bg relative overflow-hidden">
      {/* Floating Grid Background */}
      <FloatingGrid />
      
      {/* Header with 3D effects */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div 
          className="relative z-10 px-6 py-8 parallax-element"
          style={{
            transform: `translateX(${mousePosition.x * 5}px) translateY(${mousePosition.y * 3}px)`
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="floating-element">
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight neon-glow">
                  Competitor Pricing Intelligence
                </h1>
                <p className="text-blue-200 text-lg">
                  Advanced anomaly detection • Real-time monitoring • Strategic insights
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant={isLive ? "default" : "outline"}
                  onClick={() => setIsLive(!isLive)}
                  className={`flex items-center space-x-2 interactive-button ${isLive ? 'pulse-glow' : ''}`}
                >
                  <Activity className={`h-4 w-4 ${isLive ? 'animate-pulse' : ''}`} />
                  <span>{isLive ? 'Live' : 'Paused'}</span>
                </Button>
                <Badge variant="destructive" className="flex items-center space-x-1 anomaly-pulse">
                  <AlertTriangle className="h-3 w-3" />
                  <span>{activeAlertsCount} Active Alerts</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards with 3D effects */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm stat-card-3d glass-morphism gpu-accelerated">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-200 text-sm font-medium">Products Tracked</CardTitle>
                <Eye className="h-4 w-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockDashboardStats.total_products}</div>
              <div className="flex items-center text-green-400 text-xs mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Active monitoring
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm stat-card-3d glass-morphism gpu-accelerated">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-200 text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{activeAlertsCount}</div>
              <div className="flex items-center text-red-400 text-xs mt-1">
                <Zap className="h-3 w-3 mr-1" />
                Require attention
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm stat-card-3d glass-morphism gpu-accelerated">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-200 text-sm font-medium">Competitors</CardTitle>
                <Target className="h-4 w-4 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockDashboardStats.total_competitors}</div>
              <div className="flex items-center text-purple-400 text-xs mt-1">
                <Activity className="h-3 w-3 mr-1" />
                Being monitored
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm stat-card-3d glass-morphism gpu-accelerated">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-200 text-sm font-medium">Avg Savings</CardTitle>
                <ShoppingCart className="h-4 w-4 text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockDashboardStats.avg_savings_identified}%</div>
              <div className="flex items-center text-green-400 text-xs mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Identified opportunities
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="price-trends" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 glass-morphism">
                <TabsTrigger value="price-trends" className="tab-3d">Price Trends</TabsTrigger>
                <TabsTrigger value="anomalies" className="tab-3d">Anomalies</TabsTrigger>
                <TabsTrigger value="strategies" className="tab-3d">Strategies</TabsTrigger>
              </TabsList>
              
              <TabsContent value="price-trends" className="space-y-4 mt-6 slide-in-3d">
                <Card className="bg-slate-800/50 border-slate-700 card-3d glass-morphism">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white">Price Trends Analysis</CardTitle>
                        <CardDescription className="text-slate-400">
                          Real-time competitor pricing with anomaly detection
                        </CardDescription>
                      </div>
                      <select 
                        className="bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 interactive-button"
                        value={selectedProduct.id}
                        onChange={(e) => {
                          const product = mockProducts.find(p => p.id === parseInt(e.target.value));
                          setSelectedProduct(product);
                        }}
                      >
                        {mockProducts.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="chart-3d">
                      <PriceChart product={selectedProduct} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="anomalies" className="space-y-4 mt-6 slide-in-3d">
                <AnomalyAlert alerts={mockAlerts} />
              </TabsContent>

              <TabsContent value="strategies" className="space-y-4 mt-6 slide-in-3d">
                <StrategyRecommendations strategies={mockPricingStrategies} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Real-time Updates and Interactive Actions */}
          <div className="space-y-6">
            <RealTimeUpdates 
              updates={realtimeUpdates} 
              isLive={isLive}
            />
            
            {/* Enhanced Quick Actions with 3D effects */}
            <Card className="bg-slate-800/50 border-slate-700 card-3d glass-morphism">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 interactive-button"
                  onClick={() => setShowAddProductModal(true)}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Add New Product
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-slate-600 text-slate-200 hover:bg-slate-700 interactive-button"
                  onClick={() => setShowConfigureAlertsModal(true)}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Configure Alerts
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-slate-600 text-slate-200 hover:bg-slate-700 interactive-button"
                  onClick={() => setShowExportDataModal(true)}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced System Status */}
            <Card className="bg-slate-800/50 border-slate-700 card-3d glass-morphism">
              <CardHeader>
                <CardTitle className="text-white text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">Data Scraping</span>
                    <Badge variant="default" className="bg-green-600 pulse-glow">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">Anomaly Detection</span>
                    <Badge variant="default" className="bg-green-600 pulse-glow">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">Alert System</span>
                    <Badge variant="default" className="bg-green-600 pulse-glow">Running</Badge>
                  </div>
                  <div className="text-xs text-slate-400 mt-3">
                    Last updated: {new Date(mockDashboardStats.last_updated).toLocaleTimeString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      <AddProductModal 
        isOpen={showAddProductModal} 
        onClose={() => setShowAddProductModal(false)} 
      />
      <ConfigureAlertsModal 
        isOpen={showConfigureAlertsModal} 
        onClose={() => setShowConfigureAlertsModal(false)} 
      />
      <ExportDataModal 
        isOpen={showExportDataModal} 
        onClose={() => setShowExportDataModal(false)} 
      />
    </div>
  );
};

export default Dashboard;