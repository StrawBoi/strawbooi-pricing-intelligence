import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  Zap,
  Wifi,
  WifiOff
} from "lucide-react";

const RealTimeUpdates = ({ updates, isLive }) => {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (updates.length > 0) {
      setLastUpdate(new Date());
    }
  }, [updates]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getChangeIcon = (percentage) => {
    const change = parseFloat(percentage);
    if (change > 0) return <TrendingUp className="h-3 w-3 text-red-400" />;
    if (change < 0) return <TrendingDown className="h-3 w-3 text-green-400" />;
    return <Activity className="h-3 w-3 text-slate-400" />;
  };

  const getChangeColor = (percentage) => {
    const change = parseFloat(percentage);
    if (Math.abs(change) > 5) return "text-red-400";
    if (Math.abs(change) > 2) return "text-yellow-400";
    return "text-slate-400";
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <Activity className={`h-5 w-5 ${isLive ? 'text-green-400 animate-pulse' : 'text-slate-400'}`} />
            <span>Real-Time Updates</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {isLive ? (
              <div className="flex items-center space-x-1 text-green-400">
                <Wifi className="h-4 w-4" />
                <span className="text-xs">Live</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-slate-400">
                <WifiOff className="h-4 w-4" />
                <span className="text-xs">Paused</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-slate-700/30 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="text-slate-400">
              Last update: <span className="text-white">{formatTime(lastUpdate)}</span>
            </div>
            <div className="text-slate-400">
              Updates: <span className="text-green-400 font-medium">{updates.length}</span>
            </div>
          </div>
        </div>

        <ScrollArea className="h-80">
          <div className="space-y-3">
            {updates.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400">
                  {isLive ? 'Waiting for price updates...' : 'Updates paused'}
                </p>
              </div>
            ) : (
              updates.map((update, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${
                    index === 0 
                      ? 'border-blue-500/50 bg-blue-950/20 animate-in slide-in-from-top-2' 
                      : 'border-slate-600 bg-slate-700/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-white text-sm">
                          {update.product}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {update.competitor}
                        </Badge>
                        {index === 0 && (
                          <Badge className="bg-blue-600 text-white text-xs animate-pulse">
                            New
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="text-slate-300">
                          ${update.old_price.toFixed(2)} → 
                          <span className="font-medium text-white ml-1">
                            ${update.new_price.toFixed(2)}
                          </span>
                        </div>
                        
                        <div className={`flex items-center space-x-1 ${getChangeColor(update.change_percentage)}`}>
                          {getChangeIcon(update.change_percentage)}
                          <span className="font-medium">
                            {parseFloat(update.change_percentage) > 0 ? '+' : ''}
                            {parseFloat(update.change_percentage).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-slate-400 ml-3">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(update.timestamp)}
                    </div>
                  </div>
                  
                  {Math.abs(parseFloat(update.change_percentage)) > 3 && (
                    <div className="flex items-center mt-2 p-2 bg-yellow-950/30 border border-yellow-800/30 rounded text-xs">
                      <Zap className="h-3 w-3 mr-2 text-yellow-400" />
                      <span className="text-yellow-300">Significant price movement detected</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        
        {updates.length > 0 && (
          <div className="mt-4 text-center">
            <div className="text-xs text-slate-400">
              Showing last {Math.min(updates.length, 10)} updates
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeUpdates;