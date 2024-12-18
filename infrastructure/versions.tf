terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.7"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6.4"
    }
  }
}
