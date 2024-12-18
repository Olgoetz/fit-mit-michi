resource "stripe_webhook_endpoint" "preprod" {
  url         = "https://webhook-url-consumer.com"
  description = "Preprod Webhook Endpoint"
  enabled_events = [
    "customer.subscription.created",
    "customer.subscription.updated"
  ]
}
