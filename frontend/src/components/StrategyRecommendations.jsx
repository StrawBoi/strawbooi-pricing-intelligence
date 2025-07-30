import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  Brain, 
  Zap,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const StrategyRecommendations = ({ strategies }) => {
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return "text-green-400";
    if (confidence >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getImpactType = (impact) => {
    if (impact.includes('sales')) return { icon: TrendingUp, color: 'text-blue-400' };
    if (impact.includes('revenue')) return { icon: DollarSign, color: 'text-green-400' };
    return { icon: Target, color: 'text-purple-400' };
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-400" />
            <span>AI-Powered Pricing Strategies</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {strategies.map((strategy, index) => {
              const ImpactIcon = getImpactType(strategy.projected_impact).icon;
              const impactColor = getImpactType(strategy.projected_impact).color;
              
              return (
                <div 
                  key={index}
                  className={`p-6 rounded-lg border transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                    selectedStrategy === index 
                      ? 'border-purple-500/50 bg-purple-950/20' 
                      : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                  }`}
                  onClick={() => setSelectedStrategy(selectedStrategy === index ? null : index)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-white text-lg">
                          {strategy.product}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className={`${getConfidenceColor(strategy.confidence)} border-current`}
                        >
                          {strategy.confidence}% Confidence
                        </Badge>
                      </div>
                      
                      <div className="text-2xl font-bold text-green-400 mb-2">
                        ${strategy.recommended_price}
                      </div>
                      
                      <p className="text-slate-300 text-sm mb-3">
                        <span className="font-medium text-white">Strategy:</span> {strategy.strategy}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className={`flex items-center space-x-1 ${impactColor}`}>
                          <ImpactIcon className="h-4 w-4" />
                          <span>{strategy.projected_impact}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-slate-400">
                          <Brain className="h-3 w-3" />
                          <span>AI Recommended</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <div className="text-right">
                        <div className="text-sm text-slate-400">Confidence</div>
                        <Progress 
                          value={strategy.confidence} 
                          className="w-20 h-2"
                        />
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Apply
                      </Button>
                    </div>
                  </div>
                  
                  {/* Expandable Details */}
                  {selectedStrategy === index && (
                    <div className="mt-4 pt-4 border-t border-slate-600 animate-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-white font-medium mb-2 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-2 text-blue-400" />
                              Rationale
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                              {strategy.rationale}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-white font-medium mb-2 flex items-center">
                              <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                              Expected Impact
                            </h4>
                            <div className="text-green-400 font-semibold">
                              {strategy.projected_impact}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-white font-medium mb-2">Implementation Steps</h4>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-slate-300">
                                <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                                Update pricing system
                              </div>
                              <div className="flex items-center text-sm text-slate-300">
                                <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                                Monitor competitor response
                              </div>
                              <div className="flex items-center text-sm text-slate-300">
                                <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                                Track performance metrics
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              Schedule
                            </Button>
                            <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Summary Stats */}
          <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="text-slate-400">
                Total strategies: <span className="text-white font-medium">{strategies.length}</span>
              </div>
              <div className="text-slate-400">
                Avg confidence: <span className="text-green-400 font-medium">
                  {Math.round(strategies.reduce((acc, s) => acc + s.confidence, 0) / strategies.length)}%
                </span>
              </div>
              <div className="text-slate-400">
                High confidence: <span className="text-green-400 font-medium">
                  {strategies.filter(s => s.confidence >= 85).length}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategyRecommendations;