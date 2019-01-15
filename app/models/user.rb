class User < ApplicationRecord
	validates :username, presence: {message: "You must input a username"}, uniqueness: { case_sensitive: false, message: "That username is taken" }
	validates :password, presence: {message: "You must use a password"}
	validates :password, confirmation: true
	validates :password_confirmation, presence: {message: "You must confirm your password"}
	validates :email, presence: {message: "You must provide a valid email"}


	has_secure_password
	has_many :tools
	
	# "loaner_contract == in the role of loaner
	has_many :loaner_contracts, foreign_key: :loaner_id, class_name: "Contract"
	has_many :borrowers, through: :loaner_contracts, source: :borrower 

	# "borrower_contract" ==  in the role of borrower
	has_many :borrower_contracts, foreign_key: :borrower_id, class_name: "Contract"
	has_many :loaners, through: :borrower_contracts, source: :loaner

	def active
		array = []
		self.loaner_contracts.each do |c|
			if c.active == true
				array << c
			end
		end


		
		self.borrower_contracts.each do |c|
			if c.active == true
				array << c
			end
		end
		array	
	end

	def active_loans

	# could replace this whole thing with next line?
	# self.loaner_contracts.active

		array = []
		self.loaner_contracts.each do |c|
			if c.active == true
				array << c
			end
		end
		array	
	end

	def active_borrows
		array = []
		self.borrower_contracts.each do |c|
			if c.active == true
				array << c
			end
		end
		array
	end

	def loan_history
		array = []
		self.loaner_contracts.each do |c|
			if c.active == false
				array << c
			end
		end
		array
	end

	def borrow_history
		array = []
		self.borrower_contracts.each do |c|
			if c.active == false
				array << c
			end
		end
		array
	end

	def available_tools
		self.tools.select { |t| t.active == false}
	end

	def self.create_with_omniauth(auth)
	  user = User.find_or_create_by(uid: auth[:uid], provider:  auth[:provider])
	  user.email = "#{auth['uid']}@#{auth['provider']}.com"
	  user.password = auth['uid']

	  if User.exists?(user.id)
	    user
	  else
	    user.save!
	    user
  end
end
end
