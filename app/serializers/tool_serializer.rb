class ToolSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :user_id, :active
  has_many :contracts
end
