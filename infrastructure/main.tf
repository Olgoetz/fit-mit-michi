provider "aws" {
  region                   = "eu-central-1"
  shared_credentials_files = ["~/.aws/credentials"]
  default_tags {
    tags = {
      "Terraform" = "true"
      "Client"    = "michaela.suessbauer"
    }

  }
}

locals {
  prefix       = "fitmitmichi"
  envs         = ["nonprod", "prod"]
  bucket_names = [for env in local.envs : "${local.prefix}-${env}-${data.aws_caller_identity.current.account_id}"]
}




data "aws_caller_identity" "current" {}


data "aws_iam_policy_document" "bp" {
  for_each = toset(local.bucket_names)
  statement {
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${each.key}/image/*"]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

module "s3_bucket" {
  for_each = toset(local.bucket_names)
  source   = "terraform-aws-modules/s3-bucket/aws"

  bucket = each.key
  acl    = "private"

  block_public_acls                     = false
  block_public_policy                   = false
  ignore_public_acls                    = false
  restrict_public_buckets               = false
  attach_deny_insecure_transport_policy = true
  attach_require_latest_tls_policy      = true
  attach_policy                         = true
  policy                                = data.aws_iam_policy_document.bp[each.key].json

  control_object_ownership = true
  object_ownership         = "ObjectWriter"

  versioning = {
    enabled = false
  }
  cors_rule = [
    {
      allowed_methods = ["PUT", "POST", "DELETE", "GET", "HEAD"]
      allowed_origins = ["http://localhost:3000"]
      allowed_headers = ["*"]
      expose_headers  = []
      max_age_seconds = 3000
    }
  ]
}



data "aws_iam_policy_document" "this" {
  statement {
    effect    = "Allow"
    actions   = ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"]
    resources = [for b in local.bucket_names : "arn:aws:s3:::${b}/*"]
  }
  statement {
    effect    = "Allow"
    actions   = ["s3:ListBucket"]
    resources = [for b in local.bucket_names : "arn:aws:s3:::${b}"]
  }
}


# IAM for video upload
resource "aws_iam_user" "this" {
  for_each = toset(local.envs)
  name     = "${local.prefix}-video-upload-user-${each.key}"
}

resource "aws_iam_access_key" "this" {
  for_each = toset(local.envs)
  user     = aws_iam_user.this[each.key].name
}

resource "aws_iam_user_policy" "this" {
  for_each = toset(local.envs)
  name     = "${local.prefix}-video-upload-policy-${each.key}"
  user     = aws_iam_user.this[each.key].name
  policy   = data.aws_iam_policy_document.this.json
}

# data "aws_iam_policy_document" "vu" {
#   statement {
#     effect    = "Allow"
#     actions   = ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"]
#     resources = ["${module.video-bucket.s3_bucket_arn}/*", "${module.video-bucket-staging.s3_bucket_arn}/*"]
#   }
#   statement {
#     effect    = "Allow"
#     actions   = ["s3:ListBucket"]
#     resources = [module.video-bucket.s3_bucket_arn, module.video-bucket-staging.s3_bucket_arn]
#   }
# statement {
#   effect    = "Allow"
#   actions   = ["cloudfront:*"]
#   resources = ["arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/E*"]
# }
# statement {
#   effect    = "Allow"
#   actions   = ["ssm:GetParameter"]
#   resources = [aws_ssm_parameter.cloudfront_key.arn]
# }
# statement {
#   effect    = "Allow"
#   actions   = ["dynamodb:PutItem", "dynamodb:DeleteItem", "dynamodb:GetItem"]
#   resources = [aws_dynamodb_table.basic-dynamodb-table.arn]
# }
#}

# Get secrets

locals {

  preprod_ssm_parameters = [
    "/preprod/fit-mit-michi/clerk_secret_key",
    "/preprod/fit-mit-michi/resend_api_key",
    "/preprod/fit-mit-michi/stripe_api_secret_key",
    "/preprod/fit-mit-michi/stripe_webhook_secret",
    "/preprod/fit-mit-michi/sentry_auth_token",
    "/preprod/fit-mit-michi/supabase_connection_string"
  ]
}


data "aws_ssm_parameter" "preprod" {
  for_each = toset(local.preprod_ssm_parameters)
  name     = each.value
}
