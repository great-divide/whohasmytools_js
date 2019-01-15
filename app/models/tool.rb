class Tool < ApplicationRecord
	belongs_to :user
	has_many   :contracts

	def active
		if self.contracts.any? { |c| c.active}
			true
		else
			false
		end
	end
end
