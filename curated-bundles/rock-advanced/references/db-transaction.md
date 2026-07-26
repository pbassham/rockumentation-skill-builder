---
description: Use when you need to bundle multiple database modifications together so all changes rollback if any operation fails
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > DB Transaction

v18.0

Discovering the capability to modify data might lead you to scenarios where altering multiple entities simultaneously becomes necessary. Imagine wanting to add a new group and then immediately add a member to that group. This seems straightforward, until you encounter an error while adding the group member—perhaps due to validation issues or incorrect data. This would leave you with a new group but no members.

Modern applications address this challenge with the concept of transactions, which bundle changes together so that if one action fails, all changes are reverted, or 'rolled back'. Helix (Lava Applications) embraces this modern approach, recognizing the importance of supporting such scenarios. Frankly, we introduced transaction blocks partly out of convenience; it saves us the effort of manually writing Lava logic to undo changes when errors occur, ensuring the system remains efficient and user-friendly.

```
{% dbtransaction %}

    {% modifygroup id:'0' %}
        [[ property name:'Name' ]]Ted's Traveling Circus[[ endproperty ]]
        [[ property name:'GroupTypeId' ]]26[[ endproperty ]]
    {% endmodifygroup %}
    
    {% modifygroupmember id:'0' %}
        [[ property name:'PersonId' ]]{{ CurrentPerson.Id }}[[ endproperty ]]
        [[ property name:'GroupId' ]]{{ ModifyResult.Group.Id }}[[ endproperty ]]
    {% endmodifygroupmember %}
    
{% enddbtransaction %}

{% if TransactionResult.Success == false %}
    <div class="alert alert-warning">
        <strong>{{ TransactionResult.ErrorMessage }}</strong><br>
        Validation Messages<br>
        <ul>
        {% for message in TransactionResult.ValidationErrors %}
            <li>{{ message.ErrorMessage }}</li>
        {% endfor %}
        </ul>
    </div> 
{% endif %}
```

You might catch in the sample above that the call to save a group member (lines 8-11) is missing the required `GroupRoleId`. Because of this the previously saved `Group` is rolled back.

Note

Database transactions are currently supported exclusively for encapsulating Modify Entity commands.

## Parameters

- [enablecontextisolation](#enablecontextisolation)
- [forcerollback](#forcerollback)

## Enable Context Isolation v19.3

*Optional:* If set to true then the transaction will run inside it's own database context. This can be used to prevent errors from leaking into subsequent transaction statements.

`  ``` {% dbtransaction enablecontextisolation:'true' %}     ... {% enddbtransaction %} ```  `

## Force Rollback

*Optional:* If set to true then the transaction will always be rolled back even if it succeeded. This can be used to test your modify commands to make sure they don't not cause any errors without actually modifying the data.

`  ``` {% dbtransaction forcerollback:'true' %}     ... {% enddbtransaction %} ```  `

