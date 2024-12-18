# Configure the GitHub Provider
provider "github" {}


resource "github_repository" "this" {
  name        = "fit-mit-michi"
  description = "Booking platform for online fitness classes"
  auto_init   = true
  visibility  = "public"

}


resource "github_branch" "prod" {
  repository = github_repository.this.name
  branch     = "prod"
}
