# API Integration Guide

This guide explains how to connect your React frontend to the Node.js/Express API backend.

## Setup Instructions

### 1. Start the API Backend

```bash
cd api
npm install
npm start
```

The API will run on `http://localhost:3000`

### 2. Start the Frontend

```bash
cd Frontend/main-file
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### 3. Environment Configuration

Create a `.env.local` file in the `Frontend/main-file` directory:

```env
VITE_API_URL=http://localhost:3000
```

## API Endpoints

### Battery Management
- `POST /battery` - Create a new battery
- `POST /battery/type` - Create a new battery type
- `POST /battery/test` - Test a battery
- `POST /battery/recycle` - Recycle a battery
- `GET /battery/:id` - Get battery by ID

### Other Endpoints
- EV management: `/ev`
- Manufacturer management: `/manufacturer`
- Recycler management: `/recycler`
- Owner management: `/owner`

## Usage Examples

### Using the API Service

```typescript
import { batteryAPI } from '../services/api';

// Create a new battery
const newBattery = await batteryAPI.createBattery({
  externalId: 'BAT001',
  universalId: 'UNI001',
  batteryTypeId: 'TYPE001',
  manufacturerId: 'MAN001',
  createdAt: '2024-01-01'
});
```

### Using the Custom Hook

```typescript
import useApi from '../hooks/useApi';
import { batteryAPI } from '../services/api';

function MyComponent() {
  const { execute: createBattery, loading, error, data } = useApi(batteryAPI.createBattery);

  const handleSubmit = async (formData) => {
    await createBattery(formData);
  };

  return (
    <div>
      {loading && <p>Creating battery...</p>}
      {error && <p>Error: {error}</p>}
      {data && <p>Success!</p>}
      <button onClick={() => handleSubmit(data)} disabled={loading}>
        Create Battery
      </button>
    </div>
  );
}
```

## CORS Configuration

The API backend is configured with CORS to allow requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (API server)

## Error Handling

The API service includes comprehensive error handling:
- Network errors
- HTTP status errors
- JSON parsing errors

All errors are logged to the console and can be handled in your components.

## Development Tips

1. **Check the browser console** for API request/response logs
2. **Use the Network tab** in DevTools to monitor API calls
3. **Verify CORS headers** if you encounter cross-origin issues
4. **Test API endpoints** using Postman or similar tools first

## Troubleshooting

### Common Issues

1. **CORS Error**: Ensure the API server is running and CORS is properly configured
2. **Connection Refused**: Check if the API server is running on port 3000
3. **Environment Variables**: Verify `.env.local` file exists and contains correct API URL

### Debug Steps

1. Check if API server is running: `curl http://localhost:3000`
2. Verify frontend environment: Check browser console for API URL
3. Test API endpoint directly: `curl -X POST http://localhost:3000/battery`
