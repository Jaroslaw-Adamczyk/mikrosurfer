import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :mikrosurfer, MikrosurferWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "62rgO0JBrSS2kZhd7gkFgU97IXQp+BRlGdErPdpeT6/QNc72LW0QYILxAP479mKb",
  server: false

# In test we don't send emails.
config :mikrosurfer, Mikrosurfer.Mailer,
  adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
