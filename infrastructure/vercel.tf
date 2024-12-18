provider "vercel" {

}


# A project that is connected to a git repository.
# Deployments will be created automatically
# on every branch push and merges onto the Production Branch.
resource "vercel_project" "this" {
  name                       = "fit-mit-michi"
  framework                  = "nextjs"
  serverless_function_region = "fra1"
  vercel_authentication = {
    deployment_type = "none"
  }

  git_repository = {
    type              = "github"
    repo              = github_repository.this.full_name
    production_branch = github_branch.prod.branch
  }

  build_command = "npx prisma generate&& npx prisma migrate deploy && next build"

}




resource "vercel_project_environment_variables" "this" {
  project_id = vercel_project.this.id
  variables = [

    ### COMMON
    {
      key    = "NEXT_PUBLIC_CLERK_SIGN_IN_URL"
      value  = "/sign-in"
      target = ["production", "preview"]
    },
    {
      key    = "NEXT_PUBLIC_CLERK_SIGN_UP_URL"
      value  = "/sign-up"
      target = ["production", "preview"]
    },



    ### PREPROD

    # Clerk
    {
      key    = "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
      value  = "pk_test_aW52aXRpbmctYmVhZ2xlLTk4LmNsZXJrLmFjY291bnRzLmRldiQ"
      target = ["preview"]
    },
    {
      key       = "CLERK_SECRET_KEY"
      value     = data.aws_ssm_parameter.preprod["/preprod/fit-mit-michi/clerk_secret_key"].value
      target    = ["preview"]
      sensitive = true
    },

    # Sentry
    {
      key       = "SENTRY_AUTH_TOKEN"
      value     = data.aws_ssm_parameter.preprod["/preprod/fit-mit-michi/sentry_auth_token"].value
      target    = ["preview"]
      sensitive = true
    },

    # Resend
    {
      key       = "RESEND_API_KEY"
      value     = data.aws_ssm_parameter.preprod["/preprod/fit-mit-michi/resend_api_key"].value
      target    = ["preview"]
      sensitive = true
    },
    {
      key   = "RESEND_CC_EMAIL"
      value = "[\"goetzoliver89@gmail.com\"]"

      target = ["preview"]
    },
    {
      key    = "RESEND_FROM_EMAIL"
      value  = "no-reply@dev.goetz-oliver.de"
      target = ["preview"]
    },

    # AWS
    {
      key    = "AWS_ACCESS_KEY_ID"
      value  = aws_iam_access_key.this["nonprod"].id
      target = ["preview"]
    },
    {
      key       = "AWS_SECRET_ACCESS_KEY"
      value     = aws_iam_access_key.this["nonprod"].secret
      target    = ["preview"]
      sensitive = true
    },
    {
      key    = "S3_BUCKET"
      value  = "fitmitmichi-nonprod-044552942866"
      target = ["preview"]
    },
    {
      key    = "NEXT_PUBLIC_S3_BUCKET"
      value  = "fitmitmichi-nonprod-044552942866"
      target = ["preview"]
    },

    # Stripe
    {
      key    = "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
      value  = "pk_test_51O7gaQFJZd14CrQ1tkUHuBHUXi4M1dTBbi6vppkRjIEA5oIvGKyq5zHuXKyhjPSelEq5WQdtLyRssD7Pi9IXhwN200PlVOJEpI"
      target = ["preview"]

    },
    {
      key       = "STRIPE_API_SECRET_KEY"
      value     = data.aws_ssm_parameter.preprod["/preprod/fit-mit-michi/stripe_api_secret_key"].value
      target    = ["preview"]
      sensitive = true
    },
    {
      key       = "STRIPE_WEBHOOK_SECRET"
      value     = data.aws_ssm_parameter.preprod["/preprod/fit-mit-michi/stripe_webhook_secret"].value
      target    = ["preview"]
      sensitive = true
    },

    # Supbase
    {
      key       = "DATABASE_URL"
      value     = "${data.aws_ssm_parameter.preprod["/preprod/fit-mit-michi/supabase_connection_string"].value}?pgbouncer=true"
      target    = ["preview"]
      sensitive = true
    },
    {
      key       = "DIRECT_URL"
      value     = data.aws_ssm_parameter.preprod["/preprod/fit-mit-michi/supabase_connection_string"].value
      target    = ["preview"]
      sensitive = true
    }

  ]
}

