import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../services/api';
import { toast } from 'react-toastify';

interface Props {
  userType: string;
}

const UserRegistrationForm: React.FC<Props> = ({ userType }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    companyName: '',
    phone: '',
    address: '',
    location: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (userType === 'ev-consumer' && !formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (userType === 'recycler' && !formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Generate IDs on the backend side - frontend doesn't need to create them
      const companyCode = formData.companyName.replace(/\s+/g, '').toUpperCase();

      let registrationData: any;

      switch (userType) {
        case 'battery-manufacturer':
          registrationData = {
            name: formData.companyName,
            brand: formData.companyName,
            username: formData.username,
            password: formData.password
          };
          console.log('Sending battery manufacturer registration:', registrationData);
          await userAPI.registerBatteryManufacturer(registrationData);
          break;

        case 'ev-manufacturer':
          registrationData = {
            name: formData.companyName,
            brand: formData.companyName,
            username: formData.username,
            password: formData.password
          };
          console.log('Sending EV manufacturer registration:', registrationData);
          await userAPI.registerEVManufacturer(registrationData);
          break;

        case 'ev-consumer':
          registrationData = {
            name: formData.companyName,
            address: formData.address,
            username: formData.username,
            password: formData.password
          };
          console.log('Sending EV consumer registration:', registrationData);
          await userAPI.registerEVConsumer(registrationData);
          break;

        case 'recycler':
          registrationData = {
            name: formData.companyName,
            location: formData.location,
            username: formData.username,
            password: formData.password
          };
          console.log('Sending recycler registration:', registrationData);
          await userAPI.registerRecycler(registrationData);
          break;

        default:
          throw new Error('Invalid user type');
      }

      toast.success(`Successfully registered as ${userType.replace('-', ' ')}!`);
      
      // Redirect to sign-in page after successful registration
      setTimeout(() => {
        navigate('/sign-in');
      }, 2000);

    } catch (error: any) {
      console.error('Registration error:', error);
      
      // More specific error handling
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to server. Please check if the backend is running.';
      } else if (error.message.includes('API request failed')) {
        errorMessage = `Server error: ${error.message}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const getUserTypeDisplayName = () => {
    return userType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="registration-form">
      <h3 style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        color: '#2d3748',
        fontSize: '1.8rem'
      }}>
        Register as {getUserTypeDisplayName()}
      </h3>
      
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="username" style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#4a5568'
          }}>
            Username *
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${errors.username ? '#e53e3e' : '#e2e8f0'}`,
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
          {errors.username && (
            <span style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {errors.username}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="email" style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#4a5568'
          }}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${errors.email ? '#e53e3e' : '#e2e8f0'}`,
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
          {errors.email && (
            <span style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {errors.email}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password" style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#4a5568'
          }}>
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${errors.password ? '#e53e3e' : '#e2e8f0'}`,
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
          {errors.password && (
            <span style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {errors.password}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="confirmPassword" style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#4a5568'
          }}>
            Confirm Password *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${errors.confirmPassword ? '#e53e3e' : '#e2e8f0'}`,
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
          {errors.confirmPassword && (
            <span style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {errors.confirmPassword}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="companyName" style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#4a5568'
          }}>
            Company Name *
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${errors.companyName ? '#e53e3e' : '#e2e8f0'}`,
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
          {errors.companyName && (
            <span style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {errors.companyName}
            </span>
          )}
        </div>

        {userType === 'ev-consumer' && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="address" style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#4a5568'
            }}>
              Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${errors.address ? '#e53e3e' : '#e2e8f0'}`,
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            {errors.address && (
              <span style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {errors.address}
              </span>
            )}
          </div>
        )}

        {userType === 'recycler' && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="location" style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#4a5568'
            }}>
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `1px solid ${errors.location ? '#e53e3e' : '#e2e8f0'}`,
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
            {errors.location && (
              <span style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {errors.location}
              </span>
            )}
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="phone" style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#4a5568'
          }}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '1rem',
            background: isLoading ? '#a0aec0' : '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
