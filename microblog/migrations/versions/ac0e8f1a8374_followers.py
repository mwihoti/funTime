"""followers

Revision ID: ac0e8f1a8374
Revises: eea4722fe6c2
Create Date: 2024-06-15 13:07:40.531250

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ac0e8f1a8374'
down_revision = 'eea4722fe6c2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('followers',
    sa.Column('follower_id', sa.Integer(), nullable=False),
    sa.Column('followed_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['followed_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['follower_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('follower_id', 'followed_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('followers')
    # ### end Alembic commands ###
