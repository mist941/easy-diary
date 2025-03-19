"""update notes

Revision ID: 5ddee1b874ae
Revises: 5841d98f32f2
Create Date: 2025-03-19 11:20:28.864422

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5ddee1b874ae'
down_revision: Union[str, None] = '5841d98f32f2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column('notes', 'created_at', new_column_name='started_at')
    op.add_column('notes', sa.Column('finished_at', sa.DateTime()))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('notes', 'finished_at')
    op.alter_column('notes', 'started_at', new_column_name='created_at')
