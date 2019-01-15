class Contract < ApplicationRecord

	# add validation for having Tool and Borrower
	
	belongs_to :tool
	belongs_to :loaner, foreign_key: "loaner_id", class_name: "User"
	belongs_to :borrower, foreign_key: "borrower_id", class_name: "User"

	scope :active, -> { where(active: true) }

	def terminate
		self.update(active: false)
	end

end
