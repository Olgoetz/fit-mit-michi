import boto3
import os
from dotenv import dotenv_values

def create_secure_string_parameter(name, value, description="Created by script"):
    """
    Create a SecureString parameter in AWS Systems Manager Parameter Store.

    :param name: The name of the parameter.
    :param value: The value of the parameter.
    :param description: A description for the parameter.
    """
    client = boto3.client("ssm")

    try:
  #      client.delete_parameter(Name=name)
        client.put_parameter(
                Name=name,
                Value=value,
                Type="SecureString",
                Overwrite=True,
                Description=description
            )
        print(f"SecureString parameter '{name}' created successfully.")
    except Exception as e:
        print(f"Error creating parameter '{name}': {e}")

def create_terraform_data_block(name):
    """
    Generate Terraform data source block for a SecureString parameter.

    :param name: The name of the parameter.
    """
    block = f"""
data "aws_ssm_parameter" "{name}" {{
  name = "{name}"
}}
    """
    return block

if __name__ == "__main__":
    # Load environment variables from .env file
    dotenv_path = ".env"

    if not os.path.exists(dotenv_path):
        print(".env file not found!")
        exit(1)

    env_vars = dotenv_values(dotenv_path)
    print(env_vars)
 
    ssm_parameters = []

    # Read key-value pairs from .env and create SecureString parameters
    for key, value in env_vars.items():
        name = f"/preprod/fit-mit-michi/{key.lower()}"
        create_secure_string_parameter(name=name, value=value)
        ssm_parameters.append(name)

    print(ssm_parameters)
    # Write Terraform blocks to a file
    with open("generated_terraform.tf", "w") as terraform_file:
        terraform_file.write(f"""
   locals {{
                             
    ssm_parameters = {ssm_parameters}                          
   }}                           
""")

    # print("Terraform data source blocks written to 'generated_terraform.tf'.")
