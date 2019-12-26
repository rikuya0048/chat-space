## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group|t.references|null: false, foreign_key: true|
|user|t.references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## userテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false, add_index: true|
|nickname|string|null: false, unique: true|
### Association
- has_many :groups_users
- has_many :groups, through: groups_users
- has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique:true|
### Association
- has_many :groups_users
- has_many :users, through: groups_users
- has_many :messages


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|t.references|null: false, foreign_key: true|
|group|t.references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
