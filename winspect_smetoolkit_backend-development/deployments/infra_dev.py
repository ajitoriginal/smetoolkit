"""
Backend(dev,staging)
winspect-backend-rw
winspect-backend-sme
winspect-backend-webhook
winspect-backend-offline
Frontend (dev,staging)
"""
import boto3
from botocore.exceptions import ClientError
import os


AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_INFRA")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY_INFRA")
ENVIRONMENT_NAME = os.getenv("ENVIRONMENT_NAME")
ssm_client = boto3.client(
    'ssm',
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name='us-east-1'
)


def get_parameters_by_path(path):
    parameters = []
    try:
        response = ssm_client.get_parameters_by_path(
            Path=path,
            Recursive=True,
            WithDecryption=True
        )
        parameters.extend(response.get('Parameters', []))

        # Pagination
        while 'NextToken' in response:
            response = ssm_client.get_parameters_by_path(
                Path=path,
                Recursive=True,
                WithDecryption=True,
                NextToken=response['NextToken']
            )
            parameters.extend(response.get('Parameters', []))

        return parameters
    except ClientError as e:
        print(f"Error retrieving parameters: {e}")
        return []


def get_environment_parameters(backend_type, environment):
    file_name = f'deployments/winspect_backend_{backend_type}_{environment}.env'
    parameter_path = f'/winspect-backend-{backend_type}/{environment}/'
    print(f"Parameters starting with '{parameter_path}':")
    parameters = get_parameters_by_path(parameter_path)
    envs = {}
    for param_obj in parameters:
        key = str(param_obj['Name']).replace(parameter_path, "")
        value = param_obj['Value']
        envs[key] = value
    create_env_file(env_variables=envs, file_name=file_name)


def create_env_file(env_variables, file_name='.env'):
    with open(file_name, 'w') as file:
        for key, value in env_variables.items():
            file.write(f'{key}={value}\n')


#get_environment_parameters('rw', ENVIRONMENT_NAME)
get_environment_parameters('sme', 'dev')
# get_environment_parameters('webhook', 'dev')
# get_environment_parameters('offline', 'staging')
