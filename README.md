
![Logo](.\static\img\logo\logo.png)


# Portfolio

A portfolio of my works and blog so far.
## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Black | ![#000000](https://via.placeholder.com/10/000?text=+) #000000 |
| White | ![#FFFFFF](https://via.placeholder.com/10/ffffff?text=+) #ffffff |
| Blue-ish Teal | ![#058FB3](https://via.placeholder.com/10/058fb3?text=+) #058fb3 |
| Green-ish Teal | ![#04f9b9](https://via.placeholder.com/10/04f9b9?text=+) #04f9b9 |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DEBUG`

`SECRET_KEY`


## Deployment

To deploy this project run this to migrate the database :  
```bash
  python manage.py migrate
```
Now collect the static files :  
```bash
  python manage.py collectstatic
```
Then run `gunicorn` : 
```bash
  gunicorn -c config/gunicorn/prod.py # for Production 
  gunicorn -c config/gunicorn/dev.py # for Development 
```



## Tech Stack

**Client:** HTML,CSS & JS

**Server:** Django, Nginx


## Demo

View it live [here](https://hushm.southafricanorth.cloudapp.azure.com/)

