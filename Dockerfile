# Use an official Python runtime as a parent image
FROM python:3.13.1-bookworm

# Set the working directory in the container
WORKDIR /backend

# Copy the requirements file into the container
COPY requirements.txt requirements.txt

# Install the dependencies in the container
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project files into the container
COPY . .

# Expose the port on which the container will run
EXPOSE 8000

# Start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]