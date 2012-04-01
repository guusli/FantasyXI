Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '144434702349849', 'cd4335412c0fa1ef358c34d0aedc9006'
end