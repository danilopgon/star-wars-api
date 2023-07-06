"""empty message

Revision ID: 1518b6b5a22d
Revises: edeccabaa574
Create Date: 2023-07-06 11:43:57.231198

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1518b6b5a22d'
down_revision = 'edeccabaa574'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(length=80),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(length=80),
               nullable=True)

    # ### end Alembic commands ###
