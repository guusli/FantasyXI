module ApplicationHelper
	def sortable(column, title = nil)
	  title ||= column.titleize
	  direction = column == sort_column && sort_direction== "desc" ? "asc" : "desc"
	  link_to title, params.merge(:sort => column, :direction => direction, :page => nil)
	end
end
