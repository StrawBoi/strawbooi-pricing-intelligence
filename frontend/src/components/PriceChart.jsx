import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

const PriceChart = ({ product }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [animatedPrices, setAnimatedPrices] = useState({});

  // Animate price changes
  useEffect(() => {
    const newAnimatedPrices = {};
    product.competitors.forEach((competitor, index) => {
      setTimeout(() => {
        setAnimatedPrices(prev => ({
          ...prev,
          [competitor.name]: competitor.current_price
        }));
      }, index * 200);
    });
  }, [product]);

  const getAllPrices = () => {
    const allPrices = [];
    product.competitors.forEach(competitor => {
      competitor.price_history.forEach(point => {
        allPrices.push(point.price);
      });
    });
    return allPrices;
  };

  const minPrice = Math.min(...getAllPrices());
  const maxPrice = Math.max(...getAllPrices());
  const priceRange = maxPrice - minPrice;

  const getYPosition = (price) => {
    return 200 - ((price - minPrice) / priceRange) * 180; // 200px height, leave 20px margin
  };

  const getColor = (competitorName) => {
    const colors = {
      'Amazon': '#FF6B35',
      'Best Buy': '#0066CC', 
      'Apple Store': '#007AFF',
      'Samsung Store': '#1428A0'
    };
    return colors[competitorName] || '#8B5CF6';
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Current Prices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {product.competitors.map((competitor) => {
          const hasAnomalies = competitor.anomalies.length > 0;
          const priceChange = competitor.price_history.length > 1 ? 
            competitor.current_price - competitor.price_history[competitor.price_history.length - 2].price : 0;
          
          return (
            <Card key={competitor.name} className={`bg-slate-700/50 border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              hasAnomalies ? 'border-red-500/50 bg-red-950/20' : 'border-slate-600'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white text-sm">{competitor.name}</h3>
                  {hasAnomalies && (
                    <AlertTriangle className="h-4 w-4 text-red-400 animate-pulse" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-white">
                    ${(animatedPrices[competitor.name] || competitor.current_price).toFixed(2)}
                  </div>
                  {priceChange !== 0 && (
                    <div className={`flex items-center text-sm ${
                      priceChange > 0 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {priceChange > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      ${Math.abs(priceChange).toFixed(2)}
                    </div>
                  )}
                </div>
                {hasAnomalies && (
                  <Badge variant="destructive" className="mt-2 text-xs">
                    {competitor.anomalies[0].type.replace('_', ' ')}
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Price Chart */}
      <div className="bg-slate-800/30 rounded-lg p-6">
        <div className="relative">
          <svg 
            width="100%" 
            height="250" 
            viewBox="0 0 800 250"
            className="overflow-visible"
          >
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(i => (
              <g key={i}>
                <line
                  x1={0}
                  y1={50 + (i * 40)}
                  x2={800}
                  y2={50 + (i * 40)}
                  stroke="#374151"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  opacity="0.3"
                />
                <text
                  x={10}
                  y={50 + (i * 40) - 5}
                  fill="#9CA3AF"
                  fontSize="12"
                  className="font-mono"
                >
                  ${(maxPrice - (i * priceRange / 4)).toFixed(0)}
                </text>
              </g>
            ))}

            {/* Price lines and points */}
            {product.competitors.map((competitor) => {
              const color = getColor(competitor.name);
              const points = competitor.price_history.map((point, index) => ({
                x: 100 + (index * 100),
                y: getYPosition(point.price),
                price: point.price,
                date: point.date,
                isAnomaly: competitor.anomalies.some(anomaly => anomaly.date === point.date)
              }));

              return (
                <g key={competitor.name}>
                  {/* Line */}
                  <path
                    d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    className="transition-all duration-300"
                    style={{
                      filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.1))',
                    }}
                  />
                  
                  {/* Points */}
                  {points.map((point, index) => (
                    <g key={index}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={point.isAnomaly ? "8" : "5"}
                        fill={point.isAnomaly ? "#EF4444" : color}
                        className={`transition-all duration-300 cursor-pointer ${
                          point.isAnomaly ? 'animate-pulse' : 'hover:r-7'
                        }`}
                        onMouseEnter={() => setHoveredPoint({
                          ...point,
                          competitor: competitor.name
                        })}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                      {point.isAnomaly && (
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="12"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="2"
                          className="animate-ping"
                        />
                      )}
                    </g>
                  ))}
                </g>
              );
            })}

            {/* Date labels */}
            {product.competitors[0].price_history.map((point, index) => (
              <text
                key={index}
                x={100 + (index * 100)}
                y={235}
                fill="#9CA3AF"
                fontSize="11"
                textAnchor="middle"
                className="font-mono"
              >
                {formatDate(point.date)}
              </text>
            ))}

            {/* Tooltip */}
            {hoveredPoint && (
              <g>
                <rect
                  x={hoveredPoint.x - 60}
                  y={hoveredPoint.y - 40}
                  width="120"
                  height="35"
                  fill="#1F2937"
                  stroke="#374151"
                  strokeWidth="1"
                  rx="4"
                  className="shadow-lg"
                />
                <text
                  x={hoveredPoint.x}
                  y={hoveredPoint.y - 25}
                  fill="white"
                  fontSize="12"
                  textAnchor="middle"
                  className="font-semibold"
                >
                  {hoveredPoint.competitor}
                </text>
                <text
                  x={hoveredPoint.x}
                  y={hoveredPoint.y - 12}
                  fill="#10B981"
                  fontSize="12"
                  textAnchor="middle"
                  className="font-mono"
                >
                  ${hoveredPoint.price.toFixed(2)}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {product.competitors.map((competitor) => (
            <div key={competitor.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getColor(competitor.name) }}
              ></div>
              <span className="text-slate-300 text-sm">{competitor.name}</span>
              {competitor.anomalies.length > 0 && (
                <AlertTriangle className="h-3 w-3 text-red-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceChart;