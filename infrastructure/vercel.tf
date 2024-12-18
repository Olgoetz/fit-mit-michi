provider "vercel" {

}


# A project that is connected to a git repository.
# Deployments will be created automatically
# on every branch push and merges onto the Production Branch.
resource "vercel_project" "this" {
  name      = "fit-mit-michi"
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = github_repository.this.full_name
  }
}

