"""Fix email regex constraint

Revision ID: 800d86faa2c6
Revises: 95dcd33346e0
Create Date: 2025-08-06 12:48:44.064488

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "800d86faa2c6"
down_revision: Union[str, Sequence[str], None] = "95dcd33346e0"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_constraint("check_email_format", "users", type_="check")
    op.create_check_constraint(
        "check_email_format",
        "users",
        "email ~* '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9.-]+$'",
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint("check_email_format", "users", type_="check")
    op.create_check_constraint(
        "check_email_format",
        "users",
        "email ~* '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'",
    )
