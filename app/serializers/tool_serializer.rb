class ToolSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :contracts
end
