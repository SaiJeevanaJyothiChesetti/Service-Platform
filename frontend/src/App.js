import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { authAPI, providerAPI, bookingAPI } from './services/api';

const STORAGE_KEY = 'service-platform-state';

const services = [
  { id: 'dance-teacher', name: 'Dance Teacher', icon: '🩰', shortIcon: 'D', description: 'Event choreography and personal dance coaching.' },
  { id: 'music-teacher', name: 'Music Teacher', icon: '🎵', shortIcon: 'M', description: 'Vocal and instrumental classes for all levels.' },
  { id: 'photographer', name: 'Photographer', icon: '📷', shortIcon: 'P', description: 'Portrait, product, and event photography.' },
  { id: 'pencil-artist', name: 'Pencil Artist', icon: '✏️', shortIcon: 'P', description: 'Custom sketches, portraits, and pencil art.' },
  { id: 'home-cook', name: 'Home Cook', icon: '�‍🍳', shortIcon: 'H', description: 'Fresh homemade meals and catering support.' },
  { id: 'plumber', name: 'Plumber', icon: '🔧', shortIcon: 'P', description: 'Repairs, fittings, and emergency plumbing work.' },
  { id: 'electrician', name: 'Electrician', icon: '⚡', shortIcon: 'E', description: 'Wiring, appliance setup, and electrical fixes.' },
  { id: 'carpenter', name: 'Carpenter', icon: '🔨', shortIcon: 'C', description: 'Furniture, repairs, and custom woodwork.' },
];

const whyChooseItems = [
  { icon: '🔎', title: 'Verified Experts', description: 'Browse through trusted providers across multiple services in one place.' },
  { icon: '🗓️', title: 'Instant Booking', description: 'Book services with just a few clicks and keep everything tracked.' },
  { icon: '⭐', title: 'Trusted Reviews', description: 'Use ratings and profiles to choose the provider that fits your need.' },
  { icon: '💰', title: 'Best Pricing', description: 'Compare providers, view prices clearly, and pick what works for you.' },
];

const howItWorks = [
  { number: '1', title: 'Choose a Service', description: 'Open any service from the sidebar or dashboard cards.' },
  { number: '2', title: 'Find a Provider', description: 'See service-specific profiles with location, price, and experience.' },
  { number: '3', title: 'Book Service', description: 'Customers can book providers and store bookings in one place.' },
  { number: '4', title: 'Enjoy Service', description: 'Use profile and booking pages to manage your full experience.' },
];

const testimonials = [
  { name: 'Rahul Sharma', quote: 'Amazing platform! I found a great plumber within minutes. Very professional service.' },
  { name: 'Priya Patel', quote: 'The booking process was so easy. Highly recommend Service Platform!' },
  { name: 'Amit Kumar', quote: 'Great experience with the tutor service. My child improved significantly.' },
];

const initialState = {
  users: [
    { id: 'u1', name: 'Hari', email: 'hari@gmail.com', password: 'password123', phone: '9876543210', city: 'Hyderabad', role: 'customer', bio: 'Looking for trusted home services.' },
    { id: 'u2', name: 'Sunitha', email: 'sunitha123@gmail.com', password: 'password123', phone: '8951376197', city: 'Bengaluru', role: 'provider', bio: 'Music teacher with beginner-friendly lessons.' },
  ],
  providers: [
    { id: 'p1', userId: 'u2', serviceId: 'music-teacher', fullName: 'Sunitha', email: 'sunitha123@gmail.com', phone: '8951376197', experience: '5', price: '500', location: 'Bengaluru', description: 'Carnatic and keyboard classes for kids and adults.', rating: '4.9' },
  ],
  bookings: [],
  currentUserId: null,
};

const loadState = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return saved ? { ...initialState, ...saved, currentUserId: saved.currentUserId ?? null } : initialState;
  } catch {
    return initialState;
  }
};

const serviceById = (id) => services.find((service) => service.id === id) || services[0];

function LogoMark({ large = false }) {
  return <div className={`logo-mark ${large ? 'logo-mark-large' : ''}`}>SP</div>;
}

function Tabs({ screen, setScreen, authed }) {
  const tabs = ['login', 'register', ...(authed ? ['dashboard', 'add-provider', 'profile'] : [])];
  return (
    <div className="preview-switcher">
      {tabs.map((tab) => (
        <button key={tab} type="button" className={`tab-btn ${screen === tab ? 'active' : ''}`} onClick={() => setScreen(tab)}>
          {tab.replace('-', ' ').replace(/^\w/, (c) => c.toUpperCase())}
        </button>
      ))}
    </div>
  );
}

function AuthSide({ title, text, points }) {
  return (
    <section className="auth-showcase">
      <div className="auth-showcase-inner">
        <div className="auth-symbol"><div className="auth-symbol-stack"><span /><span /><span /></div></div>
        <h1>{title}</h1>
        <p>{text}</p>
        <div className="auth-benefits">
          {points.map((point) => <div key={point} className="auth-benefit"><span className="check-chip">+</span><span>{point}</span></div>)}
        </div>
      </div>
    </section>
  );
}

function AuthField({ label, icon, children }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-shell"><span>{icon}</span>{children}</div>
    </div>
  );
}

function LoginScreen({ form, setForm, submit, message, setScreen, showPassword, setShowPassword }) {
  return (
    <div className="auth-layout">
      <div className="floating-preview"><Tabs screen="login" setScreen={setScreen} authed={false} /></div>
      <AuthSide title="Welcome Back" text="Sign in to access your account and manage your services" points={['🔒 Secure login', '📊 Track bookings', '🤝 Connect with providers']} />
      <section className="auth-form-panel">
        <div className="auth-form-card">
          <form className="auth-form" onSubmit={submit}>
            <LogoMark />
            <div className="auth-form-heading"><h2>🔐 Login</h2><p>Use your email and password to continue.</p></div>
            <AuthField label="📧 Email Address" icon="@"><input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="Enter your email" autoComplete="email" /></AuthField>
            <AuthField label="🔑 Password" icon="*">
              <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder="Enter your password" autoComplete="current-password" />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} title={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? '👁️' : '👁️‍🗨️'}</button>
            </AuthField>
            <div className="auth-row">
              <label className="check-row"><input type="checkbox" checked={form.remember} onChange={(e) => setForm((p) => ({ ...p, remember: e.target.checked }))} /><span>Remember me</span></label>
              <button type="button" className="link-button" onClick={() => setScreen('register')}>Need to Register?</button>
            </div>
            {message ? <div className="inline-message">{message}</div> : null}
            <button type="submit" className="primary-button full-width">🚀 Login <span>-&gt;</span></button>
            <div className="auth-footer-link"><span>Don&apos;t have an account?</span><button type="button" onClick={() => setScreen('register')}>Register</button></div>
          </form>
        </div>
      </section>
    </div>
  );
}

function RegisterScreen({ form, setForm, submit, message, setScreen, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) {
  return (
    <div className="auth-layout">
      <div className="floating-preview"><Tabs screen="register" setScreen={setScreen} authed={false} /></div>
      <AuthSide title="Join Our Platform" text="Create an account to start booking services and connect with providers" points={['🌟 Access thousands of providers', '⚡ Easy booking & scheduling', '🔐 Secure & trusted platform']} />
      <section className="auth-form-panel">
        <div className="auth-form-card">
          <form className="auth-form" onSubmit={submit}>
            <LogoMark />
            <div className="auth-form-heading"><h2>📝 Register</h2><p>Fill in the details below and choose your account type.</p></div>
            <div className="role-selector">
              {['customer', 'provider'].map((role) => (
                <button key={role} type="button" className={`role-card ${form.role === role ? 'active' : ''}`} onClick={() => setForm((p) => ({ ...p, role }))}>
                  <div className="role-icon">{role === 'customer' ? '👤' : '💼'}</div><span>{role === 'customer' ? 'Customer' : 'Provider'}</span>
                </button>
              ))}
            </div>
            <AuthField label="👤 Full Name" icon="👤"><input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Enter your full name" autoComplete="name" /></AuthField>
            <AuthField label="📧 Email Address" icon="📧"><input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="Enter your email" autoComplete="email" /></AuthField>
            <div className="auth-split">
              <AuthField label="📱 Phone Number" icon="📱"><input type="text" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Enter phone number" autoComplete="tel" /></AuthField>
              <AuthField label="📍 City" icon="📍"><input type="text" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} placeholder="Enter your city" autoComplete="address-level2" /></AuthField>
            </div>
            <div className="auth-split">
              <AuthField label="🔑 Password" icon="🔑">
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder="Create a password" autoComplete="new-password" />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} title={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? '👁️' : '👁️‍🗨️'}</button>
              </AuthField>
              <AuthField label="🔒 Confirm Password" icon="🔒">
                <input type={showConfirmPassword ? "text" : "password"} value={form.confirmPassword} onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))} placeholder="Confirm your password" autoComplete="new-password" />
                <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)} title={showConfirmPassword ? 'Hide password' : 'Show password'}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</button>
              </AuthField>
            </div>
            <div className="password-meter"><span style={{ width: `${Math.min(form.password.length * 10, 100)}%` }} /></div>
            <div className="form-group">
              <label>✍️ Short Bio</label>
              <div className="input-shell textarea-shell"><span>✍️</span><textarea rows="3" value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} placeholder="Tell us about yourself" /></div>
            </div>
            <label className="check-row check-row-spaced"><input type="checkbox" checked={form.acceptTerms} onChange={(e) => setForm((p) => ({ ...p, acceptTerms: e.target.checked }))} /><span>✅ I agree to create this account and save my details for future sign in.</span></label>
            {message ? <div className="inline-message">{message}</div> : null}
            <button type="submit" className="primary-button full-width">🚀 Register <span>-&gt;</span></button>
            <div className="auth-footer-link"><span>Already have an account?</span><button type="button" onClick={() => setScreen('login')}>Login</button></div>
          </form>
        </div>
      </section>
    </div>
  );
}

function Sidebar({ user, screen, setScreen, openService, logout }) {
  return (
    <aside className="sidebar-shell">
      <div className="sidebar-top">
        <div className="brand-row"><LogoMark /><div><h3>Service</h3><h3>Platform</h3></div><button type="button" className="close-badge">x</button></div>
        <div className="profile-strip"><div className="profile-avatar">{user.name.charAt(0).toUpperCase()}</div><div><strong>{user.name}</strong><small>{user.role}</small></div></div>
      </div>
      <div className="sidebar-scroll">
        <div className="sidebar-block">
          <span className="sidebar-caption">Main Menu</span>
          <button type="button" className={`sidebar-link ${screen === 'dashboard' ? 'active' : ''}`} onClick={() => setScreen('dashboard')}><span className="sidebar-dot" title="Dashboard">📊</span>Dashboard</button>
        </div>
        <div className="sidebar-block">
          <span className="sidebar-caption">Services</span>
          {services.map((service) => <button key={service.id} type="button" className={`sidebar-link ${screen === 'service' && service.id ? 'service-active' : ''}`} onClick={() => openService(service.id)}><span className="sidebar-dot service-dot" title={service.name}>{service.icon}</span><span className="sidebar-text">{service.name}</span></button>)}
        </div>
        <div className="sidebar-block">
          <span className="sidebar-caption">Account</span>
          <button type="button" className={`sidebar-link ${screen === 'profile' ? 'active' : ''}`} onClick={() => setScreen('profile')}><span className="sidebar-dot" title="Profile">👤</span>My Profile</button>
          <button type="button" className={`sidebar-link ${screen === 'bookings' ? 'active' : ''}`} onClick={() => setScreen('bookings')}><span className="sidebar-dot" title="Bookings">📅</span>My Bookings</button>
          <button type="button" className={`sidebar-link ${screen === 'add-provider' ? 'active' : ''}`} onClick={() => setScreen('add-provider')}><span className="sidebar-dot" title="Add Provider">➕</span>Add Provider</button>
        </div>
      </div>
      <div className="sidebar-logout"><button type="button" className="logout-button" onClick={logout}>Logout</button></div>
    </aside>
  );
}

function Dashboard({ user, providers, openService, setScreen }) {
  const average = providers.length ? (providers.reduce((sum, provider) => sum + Number(provider.rating || 4.8), 0) / providers.length).toFixed(1) : '0.0';
  return (
    <section className="content-shell">
      <div className="floating-preview content-preview"><Tabs screen="dashboard" setScreen={setScreen} authed /></div>
      <div className="hero-banner"><div className="hero-copy"><h1>Welcome to Service Platform</h1><p>Your one-stop solution for household and professional services</p><div className="hero-actions"><button type="button" className="primary-button" onClick={() => openService('music-teacher')}>Explore Services</button>{user.role === 'provider' ? <button type="button" className="secondary-button hero-secondary" onClick={() => setScreen('add-provider')}>Create Provider Profile</button> : null}</div></div></div>
      <div className="stat-grid"><article className="white-card stat-card"><strong>{providers.length}+</strong><span>Service Providers</span></article><article className="white-card stat-card"><strong>{services.length}</strong><span>Service Categories</span></article><article className="white-card stat-card"><strong>{user.role === 'provider' ? 'Ready' : 'Active'}</strong><span>{user.role === 'provider' ? 'Create profiles' : 'Book services'}</span></article><article className="white-card stat-card"><strong>{average}</strong><span>Average Rating</span></article></div>
      <section className="section-block"><h2>Services</h2><div className="service-grid">{services.map((service) => <button key={service.id} type="button" className="white-card service-card" onClick={() => openService(service.id)}><div className="service-icon">{service.icon}</div><h3>{service.name}</h3><p>{service.description}</p></button>)}</div></section>
      <section className="section-block"><h2>Why Choose Us</h2><div className="card-grid four-column">{whyChooseItems.map((item) => <article key={item.title} className="white-card info-card"><div className="mini-icon">{item.icon}</div><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
      <section className="section-block"><h2>How It Works</h2><div className="card-grid four-column">{howItWorks.map((item) => <article key={item.number} className="white-card step-card"><div className="step-badge">{item.number}</div><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
      <section className="cta-banner"><h2>Ready to Get Started?</h2><p>Explore our services from the dashboard and find the perfect provider for your needs</p><button type="button" className="primary-button" onClick={() => openService('dance-teacher')}>Browse All Services</button></section>
      <section className="section-block"><h2>What Our Customers Say</h2><div className="card-grid three-column">{testimonials.map((item) => <article key={item.name} className="white-card review-card"><div className="rating-row">★★★★★</div><p>{item.quote}</p><strong>{item.name}</strong></article>)}</div></section>
      <section className="section-block"><div className="white-card help-card"><h2>Need Help?</h2><p>Our support team is available 24/7 to assist you</p><div className="help-row"><span>✉ support@serviceplatform.com</span><span>📞 +91 98765 43210</span></div></div></section>
    </section>
  );
}

function ServicePage({ serviceId, providers, user, openAddProvider, book, setScreen }) {
  const service = serviceById(serviceId);
  return (
    <section className="content-shell">
      <div className="page-kicker"><button type="button" className="back-link" onClick={() => setScreen('dashboard')}>&lt;- Back to Dashboard</button><h1>{service.name}</h1><p>{service.description}</p></div>
      {providers.length ? <div className="provider-list">{providers.map((provider) => <article key={provider.id} className="white-card provider-card"><div className="provider-card-top"><div><h3>{provider.fullName}</h3><span>{service.name}</span></div><div className="provider-rating">Rating {provider.rating}</div></div><div className="provider-meta"><span>Location {provider.location}</span><span>Experience {provider.experience} years</span><span>Price Rs {provider.price}</span></div><p>{provider.description}</p><div className="provider-actions">{user.role === 'customer' ? <button type="button" className="primary-button" onClick={() => book(provider)}>Book This Provider</button> : null}{user.role === 'provider' ? <button type="button" className="secondary-button" onClick={() => openAddProvider(service.id)}>Create My {service.name} Profile</button> : null}</div></article>)}</div> : <div className="white-card empty-state"><div className="empty-icon">{service.icon}</div><h2>No {service.name} providers yet</h2><p>If no one is there, create a new provider profile for this service and it will appear here.</p>{user.role === 'provider' ? <button type="button" className="primary-button" onClick={() => openAddProvider(service.id)}>Create {service.name} Profile</button> : <button type="button" className="secondary-button" onClick={() => openAddProvider(service.id)}>Register as Provider</button>}</div>}
    </section>
  );
}

function AddProvider({ form, setForm, save, user, setScreen }) {
  return (
    <section className="content-shell form-shell">
      <div className="page-kicker"><button type="button" className="back-link" onClick={() => setScreen('dashboard')}>&lt;- Back to Dashboard</button><h1>Create Provider Profile</h1><p>Publish a real service profile for your account.</p></div>
      <div className="provider-form-card">
        <section className="form-section-card"><div className="section-heading">Personal Information</div><div className="form-grid"><div className="form-group wide"><label>Full Name *</label><input value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} placeholder="Enter provider full name" /></div><div className="form-group"><label>Phone Number</label><input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Contact number" /></div><div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email address" /></div></div></section>
        <section className="form-section-card"><div className="section-heading">Service Details</div><div className="service-choice-grid">{services.map((service) => <button key={service.id} type="button" className={`service-choice ${form.serviceId === service.id ? 'active' : ''}`} onClick={() => setForm((p) => ({ ...p, serviceId: service.id }))}><span>{service.icon}</span><strong>{service.name}</strong></button>)}</div><div className="form-grid"><div className="form-group"><label>Experience (years) *</label><input type="number" min="0" value={form.experience} onChange={(e) => setForm((p) => ({ ...p, experience: e.target.value }))} placeholder="Years of experience" /></div><div className="form-group"><label>Price (Rs) *</label><input type="number" min="0" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} placeholder="Price per service" /></div><div className="form-group wide"><label>Location *</label><input value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} placeholder="City or area" /></div><div className="form-group wide"><label>Description</label><textarea rows="5" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Describe the services offered" /></div></div></section>
        <div className="form-actions"><button type="button" className="secondary-button" onClick={() => setScreen('dashboard')}>Cancel</button><button type="button" className="primary-button" onClick={save}>Save Provider</button></div>
      </div>
    </section>
  );
}

function Profile({ form, setForm, save, user, providers, setScreen }) {
  const userProviders = providers.filter((p) => p.userId === user.id);
  
  return (
    <section className="content-shell profile-shell">
      <div className="profile-header"><LogoMark large /><div className="customer-tag">{user.role === 'provider' ? '🎯 Provider Account' : '👤 Customer Account'}</div></div>
      
      {user.role === 'customer' ? (
        <article className="white-card profile-card editable-profile">
          <div className="profile-card-top">
            <h2>My Profile</h2>
            <button type="button" className="primary-button" onClick={save}>Save Changes</button>
          </div>
          <div className="form-grid">
            <div className="form-group"><label>Full Name</label><input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></div>
            <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /></div>
            <div className="form-group"><label>Phone Number</label><input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} /></div>
            <div className="form-group"><label>City</label><input value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} /></div>
            <div className="form-group wide"><label>Bio</label><textarea rows="5" value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} /></div>
          </div>
        </article>
      ) : (
        <>
          <article className="white-card profile-card editable-profile">
            <div className="profile-card-top">
              <h2>My Profile</h2>
              <button type="button" className="primary-button" onClick={save}>Save Changes</button>
            </div>
            <div className="form-grid">
              <div className="form-group"><label>Full Name</label><input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} /></div>
              <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} /></div>
              <div className="form-group"><label>Phone Number</label><input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} /></div>
              <div className="form-group"><label>City</label><input value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} /></div>
              <div className="form-group wide"><label>Bio</label><textarea rows="5" value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} /></div>
            </div>
          </article>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ color: 'white', marginBottom: '1.2rem' }}>My Services</h2>
            {userProviders.length ? (
              <div style={{ display: 'grid', gap: '1.2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {userProviders.map((provider) => (
                  <article key={provider.id} className="white-card provider-card" style={{ position: 'relative' }}>
                    <div className="provider-card-top">
                      <div>
                        <h3>{serviceById(provider.serviceId).name}</h3>
                        <span>Service ID: {provider.id}</span>
                      </div>
                      <div className="provider-rating">⭐ {provider.rating}</div>
                    </div>
                    <div className="provider-meta">
                      <span>📍 Location: {provider.location}</span>
                      <span>📅 Experience: {provider.experience} years</span>
                      <span>💰 Price: Rs {provider.price}</span>
                    </div>
                    <p>{provider.description}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="white-card empty-state" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📭</div>
                <h2>No Service Profiles Yet</h2>
                <p>You haven't created any service profiles. Create one from the dashboard to get started!</p>
                <button type="button" className="primary-button" onClick={() => setScreen('add-provider')}>Create Service Profile</button>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

function Bookings({ bookings, user, providers, setScreen }) {
  const visible = user.role === 'provider' ? bookings.filter((booking) => providers.find((provider) => provider.id === booking.providerId)?.userId === user.id) : bookings.filter((booking) => booking.customerId === user.id);
  return (
    <section className="content-shell">
      <div className="page-kicker"><h1>My Bookings</h1><p>{user.role === 'provider' ? 'See customer bookings for your profiles.' : 'Track all the providers you booked.'}</p></div>
      {visible.length ? <div className="booking-list">{visible.map((booking) => <article key={booking.id} className="white-card booking-card"><div className="booking-top"><div><h3>{serviceById(booking.serviceId).name}</h3><span>{booking.providerName}</span></div><div className="booking-status">{booking.status}</div></div><div className="provider-meta"><span>Date {booking.date}</span><span>{booking.notes}</span></div></article>)}</div> : <div className="white-card empty-state"><div className="empty-icon">BK</div><h2>No bookings yet</h2><p>Your bookings will appear here after you create one from a service page.</p><button type="button" className="primary-button" onClick={() => setScreen('dashboard')}>Go to Dashboard</button></div>}
    </section>
  );
}

function App() {
  const [state, setState] = useState(loadState);
  const [screen, setScreen] = useState(loadState().currentUserId ? 'dashboard' : 'login');
  const [serviceId, setServiceId] = useState('music-teacher');
  const [message, setMessage] = useState('');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: true });
  const [registerForm, setRegisterForm] = useState({ role: 'customer', name: '', email: '', phone: '', city: '', password: '', confirmPassword: '', bio: '', acceptTerms: false });
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '', city: '', bio: '' });
  const [providerForm, setProviderForm] = useState({ serviceId: 'music-teacher', fullName: '', phone: '', email: '', experience: '', price: '', location: '', description: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const user = useMemo(() => state.users.find((item) => item.id === state.currentUserId) || null, [state]);

  useEffect(() => { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }, [state]);
  
  // Fetch providers and bookings from backend when user is logged in
  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      try {
        // Fetch all providers
        const providers = await providerAPI.getAll();
        setState((prev) => ({ ...prev, providers: providers || [] }));
        
        // Fetch user's bookings
        if (user.role === 'customer') {
          const bookings = await bookingAPI.getUserBookings();
          setState((prev) => ({ ...prev, bookings: bookings || [] }));
        }
      } catch (error) {
        console.error('Failed to fetch data from backend:', error);
        // App will continue to work with existing state data
      }
    };
    
    fetchData();
  }, [user]);
  
  useEffect(() => {
    if (!user) return;
    setProfileForm({ name: user.name || '', email: user.email || '', phone: user.phone || '', city: user.city || '', bio: user.bio || '' });
    setProviderForm((prev) => ({ ...prev, fullName: user.name || '', phone: user.phone || '', email: user.email || '', location: user.city || '' }));
  }, [user]);

  const openService = (id) => { setServiceId(id); setScreen('service'); setMessage(''); };
  const openAddProvider = (id) => { setProviderForm((prev) => ({ ...prev, serviceId: id })); setScreen('add-provider'); setMessage(''); };

  const loginSubmit = async (event) => {
    event.preventDefault();
    if (!loginForm.email.trim() || !loginForm.password) return setMessage('Please enter both email and password.');
    
    try {
      setMessage('Logging in...');
      await authAPI.login(loginForm.email.trim(), loginForm.password);
      
      // Fetch user data
      const userData = await authAPI.getMe();
      
      setState((prev) => ({ 
        ...prev, 
        currentUserId: userData.id,
        users: [userData]
      }));
      
      setLoginForm({ email: '', password: '', remember: true });
      setMessage('');
      setScreen('dashboard');
    } catch (error) {
      setMessage(error.message || 'Login failed. Please try again.');
    }
  };

  const registerSubmit = async (event) => {
    event.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.phone || !registerForm.password) return setMessage('Please fill in all required fields.');
    if (registerForm.password.length < 8) return setMessage('Password must be at least 8 characters.');
    if (registerForm.password !== registerForm.confirmPassword) return setMessage('Password and confirm password must match.');
    if (!registerForm.acceptTerms) return setMessage('Please accept the checkbox before creating your account.');
    
    try {
      setMessage('Creating account...');
      await authAPI.register(
        registerForm.email.trim(),
        registerForm.password,
        registerForm.name.trim(),
        registerForm.phone.trim(),
        registerForm.role
      );
      
      // Fetch user data
      const userData = await authAPI.getMe();
      
      setState((prev) => ({ 
        ...prev, 
        currentUserId: userData.id,
        users: [userData]
      }));
      
      setRegisterForm({ role: 'customer', name: '', email: '', phone: '', city: '', password: '', confirmPassword: '', bio: '', acceptTerms: false });
      setMessage('');
      setScreen(userData.role === 'provider' ? 'add-provider' : 'dashboard');
    } catch (error) {
      setMessage(error.message || 'Registration failed. Please try again.');
    }
  };

  const saveProfile = () => {
    if (!user) return;
    setState((prev) => ({ ...prev, users: prev.users.map((item) => item.id === user.id ? { ...item, ...profileForm } : item), providers: prev.providers.map((item) => item.userId === user.id ? { ...item, fullName: profileForm.name, email: profileForm.email, phone: profileForm.phone } : item) }));
    setMessage('Profile updated successfully.');
  };

  const saveProvider = async () => {
    if (!user) return setMessage('You must be logged in to create a provider profile.');
    if (!providerForm.fullName || !providerForm.serviceId || !providerForm.experience || !providerForm.price || !providerForm.location) return setMessage('Please fill in all required provider details.');
    
    try {
      setMessage('Creating provider profile...');
      const newProvider = await providerAPI.createProvider({
        ...providerForm,
        userId: user.id,
      });
      
      setState((prev) => ({ 
        ...prev, 
        providers: [...prev.providers, newProvider]
      }));
      
      setProviderForm((prev) => ({ ...prev, experience: '', price: '', description: '' }));
      setServiceId(newProvider.serviceId);
      setMessage('Provider profile created successfully! ✅');
      setTimeout(() => {
        setMessage('');
        setScreen('service');
      }, 1500);
    } catch (error) {
      setMessage(error.message || 'Failed to create provider profile.');
    }
  };

  const book = async (provider) => {
    if (!user || user.role !== 'customer') return setMessage('Use a customer account to book a provider.');
    
    try {
      setMessage('Creating booking...');
      const booking = await bookingAPI.createBooking({
        providerId: provider.id,
        serviceId: provider.serviceId,
        date: new Date().toISOString().slice(0, 10),
        notes: `Booking created for ${serviceById(provider.serviceId).name}`,
      });
      
      setState((prev) => ({ ...prev, bookings: [booking, ...prev.bookings] }));
      setScreen('bookings');
      setMessage('');
    } catch (error) {
      setMessage(error.message || 'Failed to create booking.');
    }
  };

  const logout = () => { 
    authAPI.logout();
    setState((prev) => ({ ...prev, currentUserId: null })); 
    setScreen('login'); 
    setMessage(''); 
  };

  if (!user) {
    return screen === 'register' ? <RegisterScreen form={registerForm} setForm={setRegisterForm} submit={registerSubmit} message={message} setScreen={setScreen} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} /> : <LoginScreen form={loginForm} setForm={setLoginForm} submit={loginSubmit} message={message} setScreen={setScreen} showPassword={showPassword} setShowPassword={setShowPassword} />;
  }

  const serviceProviders = state.providers.filter((provider) => provider.serviceId === serviceId);

  return (
    <div className="dashboard-layout">
      <Sidebar user={user} screen={screen} setScreen={setScreen} openService={openService} logout={logout} />
      {message ? <div className="global-message">{message}</div> : null}
      {screen === 'dashboard' ? <Dashboard user={user} providers={state.providers} openService={openService} setScreen={setScreen} /> : null}
      {screen === 'service' ? <ServicePage serviceId={serviceId} providers={serviceProviders} user={user} openAddProvider={openAddProvider} book={book} setScreen={setScreen} /> : null}
      {screen === 'add-provider' ? <AddProvider form={providerForm} setForm={setProviderForm} save={saveProvider} user={user} setScreen={setScreen} /> : null}
      {screen === 'profile' ? <Profile form={profileForm} setForm={setProfileForm} save={saveProfile} user={user} providers={state.providers} setScreen={setScreen} /> : null}
      {screen === 'bookings' ? <Bookings bookings={state.bookings} user={user} providers={state.providers} setScreen={setScreen} /> : null}
    </div>
  );
}

export default App;
