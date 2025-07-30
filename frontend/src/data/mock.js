// Mock data for Competitor Pricing Tracker
export const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro 256GB",
    category: "Electronics",
    tracked_since: "2024-01-15",
    competitors: [
      {
        name: "Amazon",
        current_price: 1199.99,
        price_history: [
          { date: "2024-07-01", price: 1299.99 },
          { date: "2024-07-02", price: 1289.99 },
          { date: "2024-07-03", price: 1279.99 },
          { date: "2024-07-04", price: 1199.99 },
          { date: "2024-07-05", price: 1199.99 },
          { date: "2024-07-06", price: 1149.99 }, // Anomaly - sudden drop
          { date: "2024-07-07", price: 1199.99 }
        ],
        anomalies: [
          { date: "2024-07-06", price: 1149.99, type: "sudden_drop", severity: "high" }
        ]
      },
      {
        name: "Best Buy",
        current_price: 1249.99,
        price_history: [
          { date: "2024-07-01", price: 1299.99 },
          { date: "2024-07-02", price: 1299.99 },
          { date: "2024-07-03", price: 1299.99 },
          { date: "2024-07-04", price: 1249.99 },
          { date: "2024-07-05", price: 1249.99 },
          { date: "2024-07-06", price: 1249.99 },
          { date: "2024-07-07", price: 1249.99 }
        ],
        anomalies: []
      },
      {
        name: "Apple Store",
        current_price: 1299.99,
        price_history: [
          { date: "2024-07-01", price: 1299.99 },
          { date: "2024-07-02", price: 1299.99 },
          { date: "2024-07-03", price: 1299.99 },
          { date: "2024-07-04", price: 1299.99 },
          { date: "2024-07-05", price: 1299.99 },
          { date: "2024-07-06", price: 1299.99 },
          { date: "2024-07-07", price: 1299.99 }
        ],
        anomalies: []
      }
    ]
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    category: "Electronics",
    tracked_since: "2024-02-01",
    competitors: [
      {
        name: "Amazon",
        current_price: 1199.99,
        price_history: [
          { date: "2024-07-01", price: 1299.99 },
          { date: "2024-07-02", price: 1299.99 },
          { date: "2024-07-03", price: 1199.99 },
          { date: "2024-07-04", price: 1199.99 },
          { date: "2024-07-05", price: 1199.99 },
          { date: "2024-07-06", price: 1199.99 },
          { date: "2024-07-07", price: 1199.99 }
        ],
        anomalies: []
      },
      {
        name: "Samsung Store",
        current_price: 1299.99,
        price_history: [
          { date: "2024-07-01", price: 1299.99 },
          { date: "2024-07-02", price: 1299.99 },
          { date: "2024-07-03", price: 1299.99 },
          { date: "2024-07-04", price: 1299.99 },
          { date: "2024-07-05", price: 1299.99 },
          { date: "2024-07-06", price: 1399.99 }, // Spike
          { date: "2024-07-07", price: 1299.99 }
        ],
        anomalies: [
          { date: "2024-07-06", price: 1399.99, type: "price_spike", severity: "medium" }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "MacBook Pro 14\" M3",
    category: "Computers",
    tracked_since: "2024-01-01",
    competitors: [
      {
        name: "Amazon",
        current_price: 1999.99,
        price_history: [
          { date: "2024-07-01", price: 2199.99 },
          { date: "2024-07-02", price: 2199.99 },
          { date: "2024-07-03", price: 2099.99 },
          { date: "2024-07-04", price: 1999.99 },
          { date: "2024-07-05", price: 1999.99 },
          { date: "2024-07-06", price: 1999.99 },
          { date: "2024-07-07", price: 1999.99 }
        ],
        anomalies: []
      },
      {
        name: "Apple Store",
        current_price: 2199.99,
        price_history: [
          { date: "2024-07-01", price: 2199.99 },
          { date: "2024-07-02", price: 2199.99 },
          { date: "2024-07-03", price: 2199.99 },
          { date: "2024-07-04", price: 2199.99 },
          { date: "2024-07-05", price: 2199.99 },
          { date: "2024-07-06", price: 2199.99 },
          { date: "2024-07-07", price: 2199.99 }
        ],
        anomalies: []
      }
    ]
  }
];

export const mockAlerts = [
  {
    id: 1,
    product: "iPhone 15 Pro 256GB",
    competitor: "Amazon",
    type: "sudden_drop",
    severity: "high",
    price_change: -50.00,
    current_price: 1149.99,
    previous_price: 1199.99,
    timestamp: "2024-07-06T14:30:00Z",
    message: "Amazon dropped price by $50 - significant anomaly detected!",
    status: "active"
  },
  {
    id: 2,
    product: "Samsung Galaxy S24 Ultra",
    competitor: "Samsung Store",
    type: "price_spike",
    severity: "medium",
    price_change: 100.00,
    current_price: 1399.99,
    previous_price: 1299.99,
    timestamp: "2024-07-06T10:15:00Z",
    message: "Samsung Store increased price by $100 - unusual pricing behavior",
    status: "resolved"
  },
  {
    id: 3,
    product: "MacBook Pro 14\" M3",
    competitor: "Amazon",
    type: "competitive_advantage",
    severity: "low",
    price_change: -200.00,
    current_price: 1999.99,
    previous_price: 2199.99,
    timestamp: "2024-07-04T16:45:00Z",
    message: "Amazon now $200 below Apple Store - consider price matching opportunity",
    status: "active"
  }
];

export const mockPricingStrategies = [
  {
    product: "iPhone 15 Pro 256GB",
    recommended_price: 1199.99,
    strategy: "Match Amazon's competitive pricing",
    rationale: "Amazon's recent price drop creates opportunity for aggressive positioning",
    projected_impact: "+15% sales volume",
    confidence: 85
  },
  {
    product: "Samsung Galaxy S24 Ultra",
    recommended_price: 1249.99,
    strategy: "Undercut Samsung Store by $50",
    rationale: "Take advantage of Samsung's price spike to capture market share",
    projected_impact: "+22% sales volume",
    confidence: 92
  },
  {
    product: "MacBook Pro 14\" M3",
    recommended_price: 2099.99,
    strategy: "Premium positioning above Amazon",
    rationale: "Maintain margin while staying competitive with authorized retailers",
    projected_impact: "+8% revenue",
    confidence: 78
  }
];

export const mockDashboardStats = {
  total_products: 3,
  active_alerts: 2,
  total_competitors: 5,
  avg_savings_identified: 12.5,
  last_updated: "2024-07-07T18:30:00Z"
};

// Simulated real-time price updates
export const generateRealtimeUpdate = () => {
  const products = [...mockProducts];
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  const randomCompetitor = randomProduct.competitors[Math.floor(Math.random() * randomProduct.competitors.length)];
  
  // Simulate small price fluctuation
  const priceChange = (Math.random() - 0.5) * 20; // -10 to +10 dollars
  const newPrice = Math.max(randomCompetitor.current_price + priceChange, 100);
  
  return {
    product: randomProduct.name,
    competitor: randomCompetitor.name,
    old_price: randomCompetitor.current_price,
    new_price: parseFloat(newPrice.toFixed(2)),
    timestamp: new Date().toISOString(),
    change_percentage: ((newPrice - randomCompetitor.current_price) / randomCompetitor.current_price * 100).toFixed(2)
  };
};