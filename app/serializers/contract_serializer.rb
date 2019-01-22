class ContractSerializer < ActiveModel::Serializer
  attributes :id, :borrower, :loaner, :active, :created_at, :updated_at, :tool
  belongs_to :tool
end
