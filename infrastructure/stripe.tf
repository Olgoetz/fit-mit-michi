resource "stripe_webhook_endpoint" "preprod" {
  url         = "https://${github_repository.this.name}-git-${github_repository.this.default_branch}-olivergtzs-projects.vercel.app/api/webhooks/stripe"
  description = "Preprod Webhook Endpoint"
  enabled_events = [
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
  ]
}
