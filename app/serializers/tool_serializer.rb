class ToolSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :user_id
  has_many :contracts
end
