import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertTriangle, TrendingDown, TrendingUp, Target, Clock } from "lucide-react";

const AnomalyAlert = ({ alerts }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'low': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'sudden_drop': return <TrendingDown className="h-4 w-4" />;
      case 'price_spike': return <TrendingUp className="h-4 w-4" />;
      case 'competitive_advantage': return <Target className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'sudden_drop': return 'Sudden Price Drop';
      case 'price_spike': return 'Price Spike';
      case 'competitive_advantage': return 'Competitive Advantage';
      default: return 'Unknown Anomaly';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <span>Anomaly Detection Center</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-red-950/30 rounded-lg border border-red-800/30">
              <div className="text-2xl font-bold text-red-400">
                {alerts.filter(a => a.severity === 'high').length}
              </div>
              <div className="text-red-300 text-sm">High Severity</div>
            </div>
            <div className="text-center p-4 bg-yellow-950/30 rounded-lg border border-yellow-800/30">
              <div className="text-2xl font-bold text-yellow-400">
                {alerts.filter(a => a.severity === 'medium').length}
              </div>
              <div className="text-yellow-300 text-sm">Medium Severity</div>
            </div>
            <div className="text-center p-4 bg-blue-950/30 rounded-lg border border-blue-800/30">
              <div className="text-2xl font-bold text-blue-400">
                {alerts.filter(a => a.severity === 'low').length}
              </div>
              <div className="text-blue-300 text-sm">Low Severity</div>
            </div>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <Alert key={alert.id} className={`border transition-all duration-300 hover:scale-[1.02] ${
                alert.status === 'active' 
                  ? 'border-red-500/50 bg-red-950/20' 
                  : 'border-slate-600 bg-slate-800/30'
              }`}>
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg ${
                      alert.severity === 'high' ? 'bg-red-600' :
                      alert.severity === 'medium' ? 'bg-yellow-600' :
                      'bg-blue-600'
                    }`}>
                      {getTypeIcon(alert.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-white">{alert.product}</h3>
                        <Badge variant="outline" className="text-xs">
                          {alert.competitor}
                        </Badge>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        {alert.status === 'active' && (
                          <Badge variant="destructive" className="animate-pulse">
                            Active
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-sm text-slate-300 mb-2">
                        <span className="font-medium">{getTypeLabel(alert.type)}</span> - {alert.message}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimeAgo(alert.timestamp)}</span>
                        </div>
                        <div>
                          Price: ${alert.previous_price} → 
                          <span className={alert.price_change > 0 ? 'text-red-400' : 'text-green-400'}>
                            ${alert.current_price}
                          </span>
                        </div>
                        <div className={alert.price_change > 0 ? 'text-red-400' : 'text-green-400'}>
                          {alert.price_change > 0 ? '+' : ''}${alert.price_change.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    {alert.status === 'active' && (
                      <Button size="sm" variant="outline" className="text-xs">
                        Mark Resolved
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              </Alert>
            ))}
          </div>

          {alerts.length === 0 && (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No anomalies detected. Your pricing is stable!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnomalyAlert;