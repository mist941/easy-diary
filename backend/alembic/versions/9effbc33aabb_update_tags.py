"""New migration

Revision ID: 9effbc33aabb
Revises: ad2d9cc1bd4e
Create Date: 2025-04-23 21:08:01.422848

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column

# revision identifiers, used by Alembic.
revision: str = "9effbc33aabb"
down_revision: Union[str, None] = "ad2d9cc1bd4e"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column("tags", "name", nullable=False)

    op.add_column("tags", sa.Column("color", sa.String(), nullable=True))

    tags_table = table("tags", column("color"))
    op.execute(tags_table.update().values(color="#000000"))

    op.alter_column("tags", "color", nullable=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("tags", "color")
    op.alter_column("tags", "name", nullable=True)
