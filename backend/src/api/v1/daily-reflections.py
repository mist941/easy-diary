from datetime import datetime

from fastapi import APIRouter, Depends, Query

from src.features.daily_reflections.dto import DailyReflectionCreate
from src.features.daily_reflections.services import (
    DailyReflectionService, get_daily_reflection_service)

router = APIRouter()


@router.get("/daily-reflections")
async def get_daily_reflections(
    from_date: datetime = Query(None),
    to_date: datetime = Query(None),
    daily_reflection_service: DailyReflectionService = Depends(
        get_daily_reflection_service
    ),
):
    return await daily_reflection_service.get_daily_reflections(from_date, to_date)


@router.post("/daily-reflections")
async def create_daily_reflection(
    daily_reflection_data: DailyReflectionCreate,
    daily_reflection_service: DailyReflectionService = Depends(
        get_daily_reflection_service
    ),
):
    return await daily_reflection_service.create_daily_reflection(daily_reflection_data)
