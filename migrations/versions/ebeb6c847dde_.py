"""empty message

Revision ID: ebeb6c847dde
Revises: 5965b790febd
Create Date: 2023-07-03 10:40:53.135032

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ebeb6c847dde'
down_revision = '5965b790febd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('character',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('url', sa.String(), nullable=True),
    sa.Column('height', sa.Integer(), nullable=False),
    sa.Column('mass', sa.Integer(), nullable=False),
    sa.Column('hair_color', sa.String(), nullable=False),
    sa.Column('skin_color', sa.String(), nullable=False),
    sa.Column('eye_color', sa.String(), nullable=False),
    sa.Column('birth_year', sa.String(), nullable=False),
    sa.Column('gender', sa.String(), nullable=False),
    sa.Column('homeworld', sa.String(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('edited', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('planet',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('climate', sa.String(), nullable=False),
    sa.Column('diameter', sa.String(), nullable=False),
    sa.Column('gravity', sa.String(), nullable=False),
    sa.Column('orbital_period', sa.Integer(), nullable=False),
    sa.Column('population', sa.Integer(), nullable=False),
    sa.Column('rotation_period', sa.Integer(), nullable=False),
    sa.Column('surface_water', sa.Integer(), nullable=False),
    sa.Column('terrain', sa.String(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.Column('edited', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('url')
    )
    op.create_table('vehicle',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('url', sa.String(), nullable=False),
    sa.Column('cargo_capacity', sa.Integer(), nullable=False),
    sa.Column('crew', sa.Integer(), nullable=False),
    sa.Column('length', sa.String(), nullable=False),
    sa.Column('manufacturer', sa.String(), nullable=False),
    sa.Column('max_atmosphering_speed', sa.Integer(), nullable=False),
    sa.Column('model', sa.String(), nullable=False),
    sa.Column('vehicle_class', sa.String(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=False),
    sa.Column('edited', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('url')
    )
    op.create_table('Passengers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('vehicle_id', sa.Integer(), nullable=True),
    sa.Column('passenger_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['passenger_id'], ['character.id'], ),
    sa.ForeignKeyConstraint(['vehicle_id'], ['vehicle.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('Pilots',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('vehicle_id', sa.Integer(), nullable=True),
    sa.Column('pilot_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['pilot_id'], ['character.id'], ),
    sa.ForeignKeyConstraint(['vehicle_id'], ['vehicle.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Pilots')
    op.drop_table('Passengers')
    op.drop_table('vehicle')
    op.drop_table('planet')
    op.drop_table('character')
    # ### end Alembic commands ###