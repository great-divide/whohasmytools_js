class CreateContracts < ActiveRecord::Migration[5.2]
  def change
    create_table :contracts do |t|
    	t.integer "tool_id"
	    t.integer "loaner_id"
	    t.integer "borrower_id"
	    t.boolean "active", default: true
      	t.timestamps
    end
  end
end
