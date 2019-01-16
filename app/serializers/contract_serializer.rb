class ContractSerializer < ActiveModel::Serializer
  attributes :id, :borrower, :active
  belongs_to :tool
end
