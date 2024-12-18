output "s3_buckets" {
  value = [for e in module.s3_bucket : e.s3_bucket_id]
}

output "s3_bucket_arns" {
  value = [for e in module.s3_bucket : e.s3_bucket_arn]
}


#output "technical_user_access_key" {
#  value = aws_iam_access_key.this.id
#}
output "technical_users" {
  value = { for k, v in aws_iam_access_key.this : k => {
    access_key    = v.id
    secret_access = nonsensitive(v.secret)
    }
  }
}


output "vercel_project" {
  value = vercel_project.this.team_id


}
