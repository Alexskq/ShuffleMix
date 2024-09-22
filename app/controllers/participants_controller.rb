class ParticipantsController < ApplicationController

  def index
    @participants = Participant.all
   

  end

  def home

  end
end
