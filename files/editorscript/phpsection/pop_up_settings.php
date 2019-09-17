<!-- Modal -->
<div id="pop_up_settings" class="modal fade" role="dialog" style="margin-top: 70px;">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Popup settings</h4>
      </div>
      <div class="modal-body">
        <table class="table table-condensed" id="bundle_product_table">
            <thead style="background: rgba(52,73,94,.94);color: #ECF0F1;text-align:center;" >
                <tr>
                    <th class="col-sm-2 text-left">Popups</th>
                    <th class="col-sm-4 text-left">Options</th>
                </tr>
            </thead>
            <tbody id="show_all_pop_up_list">
              <tr>
                  <td class="col-sm-2" >1.Exit popup</td>
                  <td class="col-sm-4" style="text-align:center;">
                    <input  type="radio" name="exit_popup" value="on"/> On 
                    <input type="radio" name="exit_popup" value="off"/> Off 
                    <button class="btn btn-primary btn-sm" style="margin-top: 0px !important;" data-toggle="modal" data-target="#exit_popup" data-dismiss="modal">View</button>
                  </td>
              </tr>
            </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>

