from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, Depends, Request
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from db import Base, database
from api import router, partners_api_router
from utils import validate_dependency
from core import settings
from admin import create_admin


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with database.engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    try:
        yield
    finally:
        pass


app = FastAPI(lifespan=lifespan)

app.include_router(router=router, prefix='/api', dependencies=[Depends(validate_dependency)])
app.include_router(router=partners_api_router, prefix='/api')
app.mount('/static', StaticFiles(directory='static'), name='static')
admin = create_admin(app)


origins = [
    settings.webapp_url
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

maintenance_mode = True  # Set to True during maintenance

@app.middleware('http')
async def check_maintenance_mode(request: Request, call_next):
    if maintenance_mode:
        # Serve a custom HTML page during maintenance
        return HTMLResponse(content="""
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Website Under Maintenance</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .maintenance-container {
            background-color: #fff;
            padding: 50px;
            border-radius: 20px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            max-width: 600px;
            width: 100%;
            text-align: center;
        }

        .maintenance-container img {
            width: 150px;
            margin-bottom: 30px;
        }

        .maintenance-container h1 {
            font-size: 48px;
            color: #2c3e50;
            margin-bottom: 20px;
        }

        .maintenance-container p {
            font-size: 22px;
            margin-bottom: 40px;
            color: #7f8c8d;
        }

        .maintenance-container .countdown {
            font-size: 26px;
            font-weight: bold;
            color: #e74c3c;
            margin-bottom: 20px;
        }

        @media (max-width: 768px) {
            .maintenance-container {
                padding: 30px;
            }

            .maintenance-container h1 {
                font-size: 36px;
            }

            .maintenance-container p {
                font-size: 18px;
            }

            .maintenance-container img {
                width: 120px;
            }

            .maintenance-container .countdown {
                font-size: 22px;
            }
        }
    </style>
</head>
<body>

    <div class="maintenance-container">
        <img src="https://cdn-icons-png.flaticon.com/512/1700/1700607.png" alt="Under Maintenance Icon">
        <h1>We'll Be Back Soon!</h1>
        <p>Our website is currently undergoing scheduled maintenance. We apologize for any inconvenience.</p>
    </div>

</body>
</html>

        """, status_code=503)
    response = await call_next(request)
    return response


if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)