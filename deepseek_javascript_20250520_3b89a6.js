// Add this middleware to inject union info into all responses
app.use((req, res, next) => {
  res.set('X-Union-Name', 'ASAWUSA - Associated Workers Union of South Africa');
  next();
});

// Add this route for union information
app.get('/api/union-info', (req, res) => {
  res.json({
    name: 'ASAWUSA',
    fullName: 'Associated Workers Union of South Africa',
    logo: '/uploads/logo.png',
    contact: {
      email: 'admin@asawusa.org.za',
      phone: '+27 11 123 4567',
      address: '123 Union House, Johannesburg, South Africa'
    },
    established: 2010
  });
});